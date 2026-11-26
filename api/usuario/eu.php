<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET');

$usuario = buscarUsuario(exigirUsuario());
if (!$usuario) {
    falhar('Sua sessão expirou. Entre de novo.', 401);
}

responder(['ok' => true, 'usuario' => $usuario]);
