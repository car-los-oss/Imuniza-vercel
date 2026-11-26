<?php

require __DIR__ . '/../base.php';

exigirMetodo('POST');

$adminId = exigirAdmin();

$vacinaId = lerInteiro('vacina_id', 'Tipo de vacina', 1, PHP_INT_MAX);
$vacina = consultar('select id, nome from vacinas where id = ?', [$vacinaId])->fetch();
if (!$vacina) {
    falhar('Selecione um tipo de vacina.', 422, 'vacina_id');
}

$data = lerData('data_evento', 'Data do evento', true);
if ($data < date('Y-m-d')) {
    falhar('A data do evento não pode estar no passado.', 422, 'data_evento');
}

$dose = obrigatorio('dose', 'Dose', 30);
$publico = obrigatorio('publico_alvo', 'Público-alvo', 80);
if (!in_array($publico, PUBLICOS, true)) {
    falhar('Público-alvo inválido.', 422, 'publico_alvo');
}

$duracao = lerInteiro('duracao_dias', 'Duração (dias)', 1, 365);
$titulo = texto('titulo', 120) ?? ('Campanha de ' . $vacina['nome']);
$lote = texto('lote', 40);
$local = obrigatorio('local_aplicacao', 'Local de aplicação', 120);
$observacoes = textoLongo('observacoes', 1000);

$evento = consultar(
    "insert into eventos (administrador_id, vacina_id, titulo, dose, lote, data_evento, duracao_dias,
                          publico_alvo, local_aplicacao, observacoes, status)
     values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'enviado')
     returning id, titulo, data_evento, data_evento + duracao_dias - 1 as termina_em, status, " . sqlAlcance('publico_alvo') . ' as alcance',
    [$adminId, $vacinaId, $titulo, $dose, $lote, $data, $duracao, $publico, $local, $observacoes]
)->fetch();

$evento['id'] = (int) $evento['id'];
$evento['alcance'] = (int) $evento['alcance'];

responder(['ok' => true, 'evento' => $evento], 201);
