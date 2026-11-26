<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET', 'POST');

$id = exigirUsuario();

if (metodo() === 'POST') {
    $codigo = novoCodigoCarteira();
    consultar('update usuarios set codigo_carteira = ? where id = ?', [$codigo, $id]);
    responder(['ok' => true, 'codigo' => $codigo, 'trocado' => true]);
}

$codigo = consultar('select codigo_carteira from usuarios where id = ?', [$id])->fetchColumn();
if (!$codigo) {
    $codigo = novoCodigoCarteira();
    consultar('update usuarios set codigo_carteira = ? where id = ? and codigo_carteira is null', [$codigo, $id]);
    $codigo = consultar('select codigo_carteira from usuarios where id = ?', [$id])->fetchColumn();
}

responder(['ok' => true, 'codigo' => $codigo]);
