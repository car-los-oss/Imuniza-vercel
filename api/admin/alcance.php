<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET');

exigirAdmin();

$publico = isset($_GET['publico']) ? trim((string) $_GET['publico']) : '';
if ($publico !== '' && !in_array($publico, PUBLICOS, true)) {
    falhar('Público-alvo inválido.');
}

$alcance = (int) consultar(
    'select count(*) from usuarios u where imuniza_no_publico(u.data_nascimento, ?)',
    [$publico === '' ? null : $publico]
)->fetchColumn();

responder(['ok' => true, 'alcance' => $alcance]);
