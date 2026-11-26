<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET');

$id = exigirAdmin();
$admin = buscarAdmin($id);
if (!$admin) {
    falhar('Sua sessão expirou. Entre de novo.', 401);
}

$acessos = consultar(
    'select criado_em from sessoes where administrador_id = ? order by criado_em desc limit 2',
    [$id]
)->fetchAll(PDO::FETCH_COLUMN);
$admin['ultimo_acesso'] = $acessos[1] ?? $acessos[0] ?? null;

responder(['ok' => true, 'admin' => $admin]);
