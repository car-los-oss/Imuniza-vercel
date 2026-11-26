<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET');

$id = exigirUsuario();

$ano = (int) ($_GET['ano'] ?? date('Y'));
$mes = (int) ($_GET['mes'] ?? date('n'));
if ($ano < 1900 || $ano > 2100 || $mes < 1 || $mes > 12) {
    falhar('Mês inválido.');
}
$inicio = sprintf('%04d-%02d-01', $ano, $mes);

$marcacoes = consultar(
    "select d.data_prevista as data, 'dose' as tipo,
            v.nome || ' — ' || d.numero_dose || 'ª dose' as titulo, d.local_aplicacao
     from doses d
     join vacinas v on v.id = d.vacina_id
     where d.usuario_id = :usuario and d.status = 'pendente'
       and d.data_prevista >= cast(:inicio as date)
       and d.data_prevista < cast(:inicio as date) + interval '1 month'
     union all
     select e.data_evento, 'campanha', coalesce(e.titulo, v.nome), e.local_aplicacao
     from eventos e
     join vacinas v on v.id = e.vacina_id
     where e.status = 'enviado'
       and e.data_evento >= cast(:inicio as date)
       and e.data_evento < cast(:inicio as date) + interval '1 month'
     order by 1",
    ['usuario' => $id, 'inicio' => $inicio]
)->fetchAll();

$proximas = consultar(
    "select * from (
        select d.data_prevista as data, null::date as termina_em, 'dose' as tipo,
               v.nome || ' — ' || d.numero_dose || 'ª dose' as titulo, d.local_aplicacao
        from doses d
        join vacinas v on v.id = d.vacina_id
        where d.usuario_id = :usuario and d.status = 'pendente' and d.data_prevista >= current_date
        union all
        select e.data_evento, e.data_evento + coalesce(e.duracao_dias, 1) - 1, 'campanha',
               coalesce(e.titulo, v.nome), e.local_aplicacao
        from eventos e
        join vacinas v on v.id = e.vacina_id
        where e.status = 'enviado' and e.data_evento + coalesce(e.duracao_dias, 1) - 1 >= current_date
     ) itens
     order by greatest(data, current_date), data
     limit 5",
    ['usuario' => $id]
)->fetchAll();

responder(['ok' => true, 'ano' => $ano, 'mes' => $mes, 'marcacoes' => $marcacoes, 'proximas' => $proximas]);
