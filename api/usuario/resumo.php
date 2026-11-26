<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET');

$id = exigirUsuario();

$progresso = consultar(
    "select count(*) filter (where status = 'aplicada') as aplicadas,
            count(*) filter (where status = 'pendente') as pendentes,
            count(*) filter (where status = 'pendente' and data_prevista < current_date) as atrasadas,
            count(*) as total
     from doses where usuario_id = ?",
    [$id]
)->fetch();

$aplicadas = (int) $progresso['aplicadas'];
$total = (int) $progresso['total'];

$proxima = consultar(
    "select v.id as vacina_id, v.nome, d.numero_dose, d.data_prevista, d.local_aplicacao, d.lote,
            d.data_prevista - current_date as faltam_dias
     from doses d
     join vacinas v on v.id = d.vacina_id
     where d.usuario_id = ? and d.status = 'pendente' and d.data_prevista >= current_date
     order by d.data_prevista
     limit 1",
    [$id]
)->fetch() ?: null;

if ($proxima) {
    $proxima['vacina_id'] = (int) $proxima['vacina_id'];
    $proxima['numero_dose'] = (int) $proxima['numero_dose'];
    $proxima['faltam_dias'] = (int) $proxima['faltam_dias'];
}

$campanhas = consultar(
    "select e.id, coalesce(e.titulo, v.nome) as titulo, v.nome as vacina, e.data_evento,
            e.data_evento + coalesce(e.duracao_dias, 1) - 1 as termina_em, e.local_aplicacao, e.publico_alvo,
            case when e.data_evento <= current_date then 'disponivel' else 'em_breve' end as situacao
     from eventos e
     join vacinas v on v.id = e.vacina_id
     where e.status = 'enviado'
       and e.data_evento + coalesce(e.duracao_dias, 1) - 1 >= current_date
       and e.data_evento <= current_date + 30
     order by e.data_evento
     limit 6"
)->fetchAll();

responder([
    'ok' => true,
    'progresso' => [
        'aplicadas' => $aplicadas,
        'pendentes' => (int) $progresso['pendentes'],
        'atrasadas' => (int) $progresso['atrasadas'],
        'total' => $total,
        'porcentagem' => $total > 0 ? (int) round(100 * $aplicadas / $total) : 0,
    ],
    'proxima' => $proxima,
    'campanhas' => $campanhas,
]);
