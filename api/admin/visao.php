<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET');

exigirAdmin();

$numeros = consultar(
    "select (select count(*) from usuarios) as usuarios_cadastrados,
            (select count(*) from usuarios where date_trunc('month', criado_em) = date_trunc('month', now())) as cadastros_no_mes,
            (select count(*) from eventos
              where current_date between data_evento and data_evento + coalesce(duracao_dias, 1) - 1) as eventos_no_periodo,
            (select count(*) from usuarios
              where data_nascimento is null or tipo_sanguineo is null or unidade_saude is null) as pendencias_de_dados"
)->fetch();

$campanhas = consultar(
    'select e.id, coalesce(e.titulo, v.nome) as titulo, v.nome as vacina, e.data_evento,
            e.data_evento + coalesce(e.duracao_dias, 1) - 1 as termina_em, e.status, e.publico_alvo,
            ' . sqlAlcance('e.publico_alvo') . ' as alcance
     from eventos e
     join vacinas v on v.id = e.vacina_id
     where e.data_evento + coalesce(e.duracao_dias, 1) - 1 >= current_date
     order by e.data_evento
     limit 4'
)->fetchAll();

foreach ($numeros as $chave => $valor) {
    $numeros[$chave] = (int) $valor;
}
foreach ($campanhas as &$c) {
    $c['id'] = (int) $c['id'];
    $c['alcance'] = (int) $c['alcance'];
}
unset($c);

responder(['ok' => true, 'numeros' => $numeros, 'campanhas' => $campanhas]);
