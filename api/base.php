<?php

declare(strict_types=1);

date_default_timezone_set('America/Sao_Paulo');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const PUBLICOS = [
    'Menores de 1 ano',
    '6 meses a 5 anos',
    'Crianças e adolescentes',
    'Adultos 18+',
    'Adultos 20+',
    'Idosos 60+',
];

const TIPOS_SANGUINEOS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

set_exception_handler(function (Throwable $erro): void {
    error_log('[imuniza] ' . $erro->getMessage() . ' em ' . $erro->getFile() . ':' . $erro->getLine());
    $resposta = ['ok' => false, 'erro' => 'Erro no servidor. Tente de novo em instantes.'];
    if (configuracao()['debug']) {
        $resposta['detalhe'] = $erro->getMessage();
    }
    responder($resposta, 500);
});

function configuracao(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }
    $arquivo = dirname(__DIR__) . '/config/config.php';
    $local = is_file($arquivo) ? require $arquivo : [];
    $env = function (string $nome, $padrao = null) {
        $valor = getenv($nome);
        return $valor === false || $valor === '' ? $padrao : $valor;
    };
    $config = [
        'db_host' => $local['db_host'] ?? $env('DB_HOST', '127.0.0.1'),
        'db_porta' => (string) ($local['db_porta'] ?? $env('DB_PORT', '5432')),
        'db_nome' => $local['db_nome'] ?? $env('DB_NAME', 'postgres'),
        'db_usuario' => $local['db_usuario'] ?? $env('DB_USER', 'postgres'),
        'db_senha' => $local['db_senha'] ?? $env('DB_PASSWORD', ''),
        'db_ssl' => $local['db_ssl'] ?? $env('DB_SSLMODE', 'require'),
        'debug' => (bool) ($local['debug'] ?? $env('APP_DEBUG', false)),
    ];
    return $config;
}

function conexao(): PDO
{
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }
    $c = configuracao();
    $dsn = sprintf(
        'pgsql:host=%s;port=%s;dbname=%s;sslmode=%s',
        $c['db_host'],
        $c['db_porta'],
        $c['db_nome'],
        $c['db_ssl']
    );
    $pdo = new PDO($dsn, $c['db_usuario'], $c['db_senha'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => true,
    ]);
    $pdo->exec("set time zone 'America/Sao_Paulo'");
    return $pdo;
}

function consultar(string $sql, array $parametros = []): PDOStatement
{
    $comando = conexao()->prepare($sql);
    $comando->execute($parametros);
    return $comando;
}

function responder(array $dados, int $codigo = 200): void
{
    http_response_code($codigo);
    echo json_encode($dados, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function falhar(string $mensagem, int $codigo = 400, ?string $campo = null): void
{
    $resposta = ['ok' => false, 'erro' => $mensagem];
    if ($campo !== null) {
        $resposta['campo'] = $campo;
    }
    responder($resposta, $codigo);
}

function exigirMetodo(string ...$metodos): void
{
    $atual = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if (!in_array($atual, $metodos, true)) {
        header('Allow: ' . implode(', ', $metodos));
        falhar('Método não permitido.', 405);
    }
}

function metodo(): string
{
    return $_SERVER['REQUEST_METHOD'] ?? 'GET';
}

function entrada(): array
{
    static $dados = null;
    if ($dados !== null) {
        return $dados;
    }
    $corpo = file_get_contents('php://input');
    $json = $corpo !== '' && $corpo !== false ? json_decode($corpo, true) : null;
    $dados = is_array($json) ? $json : $_POST;
    return $dados;
}

function texto(string $chave, int $maximo = 255, ?array $origem = null): ?string
{
    $origem = $origem ?? entrada();
    if (!isset($origem[$chave]) || is_array($origem[$chave])) {
        return null;
    }
    $valor = trim(preg_replace('/\s+/u', ' ', (string) $origem[$chave]));
    if ($valor === '') {
        return null;
    }
    return mb_substr($valor, 0, $maximo);
}

function textoLongo(string $chave, int $maximo = 2000): ?string
{
    $origem = entrada();
    if (!isset($origem[$chave]) || is_array($origem[$chave])) {
        return null;
    }
    $valor = trim((string) $origem[$chave]);
    return $valor === '' ? null : mb_substr($valor, 0, $maximo);
}

function obrigatorio(string $chave, string $rotulo, int $maximo = 255): string
{
    $valor = texto($chave, $maximo);
    if ($valor === null) {
        falhar("Preencha o campo {$rotulo}.", 422, $chave);
    }
    return $valor;
}

function marcado(string $chave): bool
{
    $valor = entrada()[$chave] ?? false;
    return in_array($valor, [true, 1, '1', 'on', 'true', 'sim'], true);
}

function soDigitos(?string $valor): string
{
    return preg_replace('/\D/', '', (string) $valor);
}

function cpfValido(string $cpf): bool
{
    if (!preg_match('/^\d{11}$/', $cpf) || preg_match('/^(\d)\1{10}$/', $cpf)) {
        return false;
    }
    for ($t = 9; $t < 11; $t++) {
        $soma = 0;
        for ($i = 0; $i < $t; $i++) {
            $soma += (int) $cpf[$i] * ($t + 1 - $i);
        }
        if ((int) $cpf[$t] !== ((10 * $soma) % 11) % 10) {
            return false;
        }
    }
    return true;
}

function lerCpf(string $chave = 'cpf'): string
{
    $cpf = soDigitos(texto($chave, 20));
    if ($cpf === '') {
        falhar('Preencha o campo CPF.', 422, $chave);
    }
    if (!cpfValido($cpf)) {
        falhar('CPF inválido. Confira os números.', 422, $chave);
    }
    return $cpf;
}

function lerEmail(string $chave = 'email', bool $exigir = true): ?string
{
    $email = texto($chave, 160);
    if ($email === null) {
        if ($exigir) {
            falhar('Preencha o campo E-mail.', 422, $chave);
        }
        return null;
    }
    $email = mb_strtolower($email);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        falhar('E-mail inválido.', 422, $chave);
    }
    return $email;
}

function lerSenhaNova(): string
{
    $senha = (string) (entrada()['senha'] ?? '');
    $confirmacao = (string) (entrada()['senha2'] ?? '');
    if (mb_strlen($senha) < 8) {
        falhar('A senha precisa ter pelo menos 8 caracteres.', 422, 'senha');
    }
    if ($senha !== $confirmacao) {
        falhar('As senhas não são iguais.', 422, 'senha2');
    }
    return password_hash($senha, PASSWORD_DEFAULT);
}

function lerData(string $chave, string $rotulo, bool $exigir = false): ?string
{
    $valor = texto($chave, 20);
    if ($valor === null) {
        if ($exigir) {
            falhar("Preencha o campo {$rotulo}.", 422, $chave);
        }
        return null;
    }
    if (preg_match('#^(\d{2})/(\d{2})/(\d{4})$#', $valor, $m)) {
        [$dia, $mes, $ano] = [(int) $m[1], (int) $m[2], (int) $m[3]];
    } elseif (preg_match('#^(\d{4})-(\d{2})-(\d{2})$#', $valor, $m)) {
        [$ano, $mes, $dia] = [(int) $m[1], (int) $m[2], (int) $m[3]];
    } else {
        falhar("{$rotulo}: use o formato dd/mm/aaaa.", 422, $chave);
    }
    if (!checkdate($mes, $dia, $ano) || $ano < 1900 || $ano > 2100) {
        falhar("{$rotulo}: data inexistente.", 422, $chave);
    }
    return sprintf('%04d-%02d-%02d', $ano, $mes, $dia);
}

function lerInteiro(string $chave, string $rotulo, int $minimo, int $maximo, bool $exigir = true): ?int
{
    $valor = texto($chave, 12);
    if ($valor === null) {
        if ($exigir) {
            falhar("Preencha o campo {$rotulo}.", 422, $chave);
        }
        return null;
    }
    if (!preg_match('/^\d+$/', $valor) || (int) $valor < $minimo || (int) $valor > $maximo) {
        falhar("{$rotulo}: informe um número entre {$minimo} e {$maximo}.", 422, $chave);
    }
    return (int) $valor;
}

function lerTipoSanguineo(): ?string
{
    $valor = texto('tipo_sanguineo', 5);
    if ($valor === null) {
        return null;
    }
    $valor = str_replace(['−', '–'], '-', mb_strtoupper($valor));
    if (!in_array($valor, TIPOS_SANGUINEOS, true)) {
        falhar('Tipo sanguíneo inválido.', 422, 'tipo_sanguineo');
    }
    return $valor;
}

function lerSimNao(string $chave): ?bool
{
    $valor = texto($chave, 10);
    if ($valor === null) {
        return null;
    }
    $valor = mb_strtolower($valor);
    if (in_array($valor, ['sim', 'true', '1'], true)) {
        return true;
    }
    if (in_array($valor, ['não', 'nao', 'false', '0'], true)) {
        return false;
    }
    return null;
}

function violouUnico(PDOException $erro): bool
{
    return $erro->getCode() === '23505';
}

function lerToken(): ?string
{
    $cabecalho = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if ($cabecalho === '' && function_exists('getallheaders')) {
        foreach (getallheaders() as $nome => $valor) {
            if (strtolower($nome) === 'authorization') {
                $cabecalho = $valor;
                break;
            }
        }
    }
    if (preg_match('/^Bearer\s+([a-f0-9]{64})$/i', trim($cabecalho), $m)) {
        return strtolower($m[1]);
    }
    return null;
}

function criarSessao(string $tipo, int $id, bool $manter): array
{
    $token = bin2hex(random_bytes(32));
    $horas = $manter ? 24 * 30 : 12;
    $coluna = $tipo === 'admin' ? 'administrador_id' : 'usuario_id';
    consultar('delete from sessoes where expira_em < now()');
    $expira = consultar(
        "insert into sessoes (token_hash, {$coluna}, expira_em)
         values (?, ?, now() + make_interval(hours => ?))
         returning expira_em",
        [hash('sha256', $token), $id, $horas]
    )->fetchColumn();
    return ['token' => $token, 'expira_em' => $expira];
}

function sessaoAtual(): ?array
{
    static $sessao = false;
    if ($sessao !== false) {
        return $sessao;
    }
    $token = lerToken();
    if ($token === null) {
        return $sessao = null;
    }
    $linha = consultar(
        'select usuario_id, administrador_id from sessoes where token_hash = ? and expira_em > now()',
        [hash('sha256', $token)]
    )->fetch();
    return $sessao = $linha ?: null;
}

function exigirUsuario(): int
{
    $sessao = sessaoAtual();
    if (!$sessao || $sessao['usuario_id'] === null) {
        falhar('Sua sessão expirou. Entre de novo.', 401);
    }
    return (int) $sessao['usuario_id'];
}

function exigirAdmin(): int
{
    $sessao = sessaoAtual();
    if (!$sessao || $sessao['administrador_id'] === null) {
        falhar('Sua sessão expirou. Entre de novo.', 401);
    }
    return (int) $sessao['administrador_id'];
}

function exigirPrincipal(): int
{
    $id = exigirAdmin();
    $papel = consultar('select papel from administradores where id = ?', [$id])->fetchColumn();
    if ($papel !== 'principal') {
        falhar('Só o administrador principal pode fazer isso.', 403);
    }
    return $id;
}

function buscarUsuario(int $id): ?array
{
    $usuario = consultar(
        'select id, nome, email, cpf, telefone, data_nascimento, tipo_sanguineo, sexo, cidade, uf,
                alergias, medicamentos_continuos, unidade_saude, doador_orgaos, observacoes,
                senha_hash is not null as conta_ativa, criado_em
         from usuarios where id = ?',
        [$id]
    )->fetch();
    if (!$usuario) {
        return null;
    }
    $usuario['id'] = (int) $usuario['id'];
    $usuario['conta_ativa'] = (bool) $usuario['conta_ativa'];
    $usuario['doador_orgaos'] = $usuario['doador_orgaos'] === null ? null : (bool) $usuario['doador_orgaos'];
    return $usuario;
}

function buscarAdmin(int $id): ?array
{
    $admin = consultar(
        'select id, nome, email, cpf, telefone, data_nascimento, sexo, cidade, uf, unidade_saude, papel,
                senha_hash is not null as ativo, criado_em
         from administradores where id = ?',
        [$id]
    )->fetch();
    if (!$admin) {
        return null;
    }
    $admin['id'] = (int) $admin['id'];
    $admin['ativo'] = (bool) $admin['ativo'];
    return $admin;
}

function dosesDoUsuario(int $usuarioId): array
{
    $linhas = consultar(
        "select v.id as vacina_id, v.nome, v.total_doses, v.intervalo_dias, v.descricao,
                d.id, d.numero_dose, d.status, d.data_prevista, d.data_aplicacao, d.lote, d.local_aplicacao,
                d.criado_em,
                (d.status = 'pendente' and d.data_prevista < current_date) as atrasada
         from doses d
         join vacinas v on v.id = d.vacina_id
         where d.usuario_id = ?
         order by v.nome, d.numero_dose",
        [$usuarioId]
    )->fetchAll();

    $vacinas = [];
    $atualizadoEm = null;
    foreach ($linhas as $l) {
        $vid = (int) $l['vacina_id'];
        if (!isset($vacinas[$vid])) {
            $vacinas[$vid] = [
                'id' => $vid,
                'nome' => $l['nome'],
                'total_doses' => (int) $l['total_doses'],
                'intervalo_dias' => $l['intervalo_dias'] === null ? null : (int) $l['intervalo_dias'],
                'descricao' => $l['descricao'],
                'aplicadas' => 0,
                'doses' => [],
            ];
        }
        $vacinas[$vid]['doses'][] = [
            'id' => (int) $l['id'],
            'numero_dose' => (int) $l['numero_dose'],
            'status' => $l['status'],
            'atrasada' => (bool) $l['atrasada'],
            'data_prevista' => $l['data_prevista'],
            'data_aplicacao' => $l['data_aplicacao'],
            'lote' => $l['lote'],
            'local_aplicacao' => $l['local_aplicacao'],
        ];
        if ($l['status'] === 'aplicada') {
            $vacinas[$vid]['aplicadas']++;
        }
        $marco = max(substr((string) $l['criado_em'], 0, 10), (string) $l['data_aplicacao']);
        if ($atualizadoEm === null || $marco > $atualizadoEm) {
            $atualizadoEm = $marco;
        }
    }

    foreach ($vacinas as &$v) {
        $atrasada = false;
        foreach ($v['doses'] as $d) {
            $atrasada = $atrasada || $d['atrasada'];
        }
        if ($v['aplicadas'] >= $v['total_doses']) {
            $v['situacao'] = 'completa';
        } elseif ($atrasada) {
            $v['situacao'] = 'atrasada';
        } elseif ($v['aplicadas'] > 0) {
            $v['situacao'] = 'em_andamento';
        } else {
            $v['situacao'] = 'pendente';
        }
    }
    unset($v);

    return ['vacinas' => array_values($vacinas), 'atualizado_em' => $atualizadoEm];
}

function mascararCpf(string $cpf): string
{
    return '***.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-**';
}

function novoCodigoCarteira(): string
{
    return bin2hex(random_bytes(16));
}

function normalizarCodigoRedefinicao(?string $codigo): string
{
    return preg_replace('/[^A-Z0-9]/', '', mb_strtoupper((string) $codigo));
}

function novoCodigoRedefinicao(): array
{
    $letras = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    $codigo = '';
    for ($i = 0; $i < 8; $i++) {
        $codigo .= $letras[random_int(0, strlen($letras) - 1)];
    }
    return [
        'codigo' => substr($codigo, 0, 4) . '-' . substr($codigo, 4),
        'hash' => hash('sha256', $codigo),
    ];
}

function sqlAlcance(string $colunaPublico): string
{
    return "(select count(*) from usuarios u where imuniza_no_publico(u.data_nascimento, {$colunaPublico}))";
}
