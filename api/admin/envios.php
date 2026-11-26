<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET');

exigirAdmin();

$eventos = consultar(
    'select e.id, coalesce(e.titulo, v.nome) as titulo, v.nome as vacina, e.dose, e.lote, e.data_evento,
            e.data_evento + coalesce(e.duracao_dias, 1) - 1 as termina_em, e.duracao_dias,
            e.publico_alvo, e.local_aplicacao, e.observacoes, e.status, a.nome as enviado_por,
            ' . sqlAlcance('e.publico_alvo') . ' as alcance
     from eventos e
     join vacinas v on v.id = e.vacina_id
     left join administradores a on a.id = e.administrador_id
     order by e.data_evento desc, e.id desc'
)->fetchAll();

foreach ($eventos as &$e) {
    $e['id'] = (int) $e['id'];
    $e['alcance'] = (int) $e['alcance'];
    $e['duracao_dias'] = $e['duracao_dias'] === null ? null : (int) $e['duracao_dias'];
}
unset($e);

responder(['ok' => true, 'eventos' => $eventos]);
