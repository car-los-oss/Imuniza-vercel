<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET', 'POST');

exigirAdmin();

if (metodo() === 'GET') {
    if (isset($_GET['id'])) {
        $usuario = buscarUsuario((int) $_GET['id']);
        if (!$usuario) {
            falhar('Usuário não encontrado.', 404);
        }
        responder(['ok' => true, 'usuario' => $usuario] + dosesDoUsuario($usuario['id']));
    }

    $busca = trim((string) ($_GET['busca'] ?? ''));
    $digitos = soDigitos($busca);
    if ($busca === '') {
        $sql = 'select id, nome, cpf, senha_hash is not null as conta_ativa from usuarios order by criado_em desc, id desc limit 8';
        $parametros = [];
    } elseif ($digitos !== '' && $digitos === preg_replace('/[\s.\-]/', '', $busca)) {
        $sql = 'select id, nome, cpf, senha_hash is not null as conta_ativa from usuarios where cpf like ? order by nome limit 20';
        $parametros = [$digitos . '%'];
    } else {
        $termo = '%' . str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $busca) . '%';
        $sql = 'select id, nome, cpf, senha_hash is not null as conta_ativa from usuarios where nome ilike ? order by nome limit 20';
        $parametros = [$termo];
    }

    $usuarios = consultar($sql, $parametros)->fetchAll();
    foreach ($usuarios as &$u) {
        $u['id'] = (int) $u['id'];
        $u['conta_ativa'] = (bool) $u['conta_ativa'];
    }
    unset($u);

    responder(['ok' => true, 'usuarios' => $usuarios]);
}

$nome = obrigatorio('nome', 'Nome completo', 120);
$cpf = lerCpf();
$nascimento = lerData('data_nascimento', 'Data de nascimento', true);
if ($nascimento > date('Y-m-d')) {
    falhar('A data de nascimento não pode estar no futuro.', 422, 'data_nascimento');
}
$tipo = lerTipoSanguineo();
$sexo = texto('sexo', 20);
$cidade = texto('cidade', 100);
$uf = texto('uf', 2);
if ($uf !== null) {
    $uf = mb_strtoupper($uf);
    if (!preg_match('/^[A-Z]{2}$/', $uf)) {
        falhar('UF inválida. Use a sigla, como SP.', 422, 'uf');
    }
}
$unidade = texto('unidade_saude', 120);
$alergias = texto('alergias', 500);
$medicamentos = texto('medicamentos_continuos', 500);
$doador = lerSimNao('doador_orgaos');
$observacoes = textoLongo('observacoes', 1000);

if (consultar('select 1 from usuarios where cpf = ?', [$cpf])->fetchColumn()) {
    falhar('Já existe um cadastro com este CPF. Use a busca ao lado.', 409, 'cpf');
}

try {
    $id = (int) consultar(
        'insert into usuarios (nome, cpf, data_nascimento, tipo_sanguineo, sexo, cidade, uf, unidade_saude,
                               alergias, medicamentos_continuos, doador_orgaos, observacoes)
         values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         returning id',
        [$nome, $cpf, $nascimento, $tipo, $sexo, $cidade, $uf, $unidade, $alergias, $medicamentos,
         $doador === null ? null : ($doador ? 'true' : 'false'), $observacoes]
    )->fetchColumn();
} catch (PDOException $erro) {
    if (violouUnico($erro)) {
        falhar('Já existe um cadastro com este CPF.', 409, 'cpf');
    }
    throw $erro;
}

responder(['ok' => true, 'usuario' => buscarUsuario($id)], 201);
