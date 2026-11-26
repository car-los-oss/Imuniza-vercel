<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET');

$id = exigirUsuario();

responder(['ok' => true] + dosesDoUsuario($id));
