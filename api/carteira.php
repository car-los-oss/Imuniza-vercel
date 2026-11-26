<?php

require __DIR__ . '/base.php';

exigirMetodo('GET');

$codigo = strtolower(trim((string) ($_GET['c'] ?? '')));
if (!preg_match('/^[a-f0-9]{32}$/', $codigo)) {
    falhar('Comprovante não encontrado. Confira se o QR Code está completo.', 404);
}

$usuario = consultar(
    'select id, nome, cpf, data_nascimento, unidade_saude from usuarios where codigo_carteira = ?',
    [$codigo]
)->fetch();
if (!$usuario) {
    falhar('Comprovante não encontrado ou substituído por um código mais novo.', 404);
}

$registro = dosesDoUsuario((int) $usuario['id']);
$aplicadas = [];
$pendentes = 0;
foreach ($registro['vacinas'] as $v) {
    foreach ($v['doses'] as $d) {
        if ($d['status'] === 'aplicada') {
            $aplicadas[] = [
                'vacina' => $v['nome'],
                'total_doses' => $v['total_doses'],
                'numero_dose' => $d['numero_dose'],
                'data_aplicacao' => $d['data_aplicacao'],
                'lote' => $d['lote'],
                'local_aplicacao' => $d['local_aplicacao'],
            ];
        }
    }
    if ($v['situacao'] !== 'completa') {
        $pendentes++;
    }
}
usort($aplicadas, fn ($a, $b) => strcmp((string) $b['data_aplicacao'], (string) $a['data_aplicacao']));

responder([
    'ok' => true,
    'titular' => [
        'nome' => $usuario['nome'],
        'cpf' => mascararCpf($usuario['cpf']),
        'data_nascimento' => $usuario['data_nascimento'],
        'unidade_saude' => $usuario['unidade_saude'],
    ],
    'aplicadas' => $aplicadas,
    'vacinas_pendentes' => $pendentes,
    'atualizado_em' => $registro['atualizado_em'],
    'consultado_em' => date('Y-m-d H:i'),
]);
