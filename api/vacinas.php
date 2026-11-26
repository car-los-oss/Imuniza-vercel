<?php

require __DIR__ . '/base.php';

exigirMetodo('GET');

$vacinas = consultar('select id, nome, total_doses, intervalo_dias from vacinas order by nome')->fetchAll();
foreach ($vacinas as &$v) {
    $v['id'] = (int) $v['id'];
    $v['total_doses'] = (int) $v['total_doses'];
    $v['intervalo_dias'] = $v['intervalo_dias'] === null ? null : (int) $v['intervalo_dias'];
}
unset($v);

responder(['ok' => true, 'vacinas' => $vacinas, 'publicos' => PUBLICOS]);
