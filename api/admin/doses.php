<?php

require __DIR__ . '/../base.php';

exigirMetodo('POST');

exigirAdmin();

$usuarioId = lerInteiro('usuario_id', 'Usuário', 1, PHP_INT_MAX);
if (!consultar('select 1 from usuarios where id = ?', [$usuarioId])->fetchColumn()) {
    falhar('Usuário não encontrado.', 404);
}

$vacinaId = lerInteiro('vacina_id', 'Vacina', 1, PHP_INT_MAX);
$vacina = consultar('select id, nome, total_doses, intervalo_dias from vacinas where id = ?', [$vacinaId])->fetch();
if (!$vacina) {
    falhar('Selecione a vacina.', 422, 'vacina_id');
}

$total = (int) $vacina['total_doses'];
$numero = lerInteiro('numero_dose', 'Dose', 1, max($total, 1) + 5);
$data = lerData('data_aplicacao', 'Data da aplicação', true);
if ($data > date('Y-m-d')) {
    falhar('A data da aplicação não pode estar no futuro.', 422, 'data_aplicacao');
}
$lote = obrigatorio('lote', 'Lote', 40);
$local = obrigatorio('local_aplicacao', 'Local', 120);

$pdo = conexao();
$pdo->beginTransaction();

$atual = consultar(
    'select id, status from doses where usuario_id = ? and vacina_id = ? and numero_dose = ? for update',
    [$usuarioId, $vacinaId, $numero]
)->fetch();

if ($atual && $atual['status'] === 'aplicada') {
    $pdo->rollBack();
    falhar("A {$numero}ª dose de {$vacina['nome']} já está registrada para esta pessoa.", 409, 'numero_dose');
}

if ($atual) {
    consultar(
        "update doses set status = 'aplicada', data_aplicacao = ?, lote = ?, local_aplicacao = ? where id = ?",
        [$data, $lote, $local, (int) $atual['id']]
    );
} else {
    consultar(
        "insert into doses (usuario_id, vacina_id, numero_dose, status, data_aplicacao, lote, local_aplicacao)
         values (?, ?, ?, 'aplicada', ?, ?, ?)",
        [$usuarioId, $vacinaId, $numero, $data, $lote, $local]
    );
}

$proximaAgendada = null;
if ($numero < $total && $vacina['intervalo_dias'] !== null) {
    $proximaAgendada = consultar(
        "insert into doses (usuario_id, vacina_id, numero_dose, status, data_prevista, local_aplicacao)
         values (?, ?, ?, 'pendente', cast(? as date) + cast(? as integer), ?)
         on conflict (usuario_id, vacina_id, numero_dose) do nothing
         returning numero_dose, data_prevista",
        [$usuarioId, $vacinaId, $numero + 1, $data, (int) $vacina['intervalo_dias'], $local]
    )->fetch() ?: null;
}

$pdo->commit();

responder(['ok' => true, 'proxima_agendada' => $proximaAgendada] + dosesDoUsuario($usuarioId), 201);
