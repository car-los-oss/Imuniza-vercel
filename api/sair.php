<?php

require __DIR__ . '/base.php';

exigirMetodo('POST');

$token = lerToken();
if ($token !== null) {
    consultar('delete from sessoes where token_hash = ?', [hash('sha256', $token)]);
}

responder(['ok' => true]);
