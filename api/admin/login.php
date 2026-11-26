<?php

require __DIR__ . '/../base.php';

exigirMetodo('POST');

$email = lerEmail();
$senha = (string) (entrada()['senha'] ?? '');
if ($senha === '') {
    falhar('Preencha o campo Senha.', 422, 'senha');
}

$admin = consultar('select id, senha_hash from administradores where email = ?', [$email])->fetch();

if (!$admin || !password_verify($senha, $admin['senha_hash'])) {
    falhar('E-mail ou senha incorretos.', 401);
}

if (password_needs_rehash($admin['senha_hash'], PASSWORD_DEFAULT)) {
    consultar('update administradores set senha_hash = ? where id = ?', [password_hash($senha, PASSWORD_DEFAULT), (int) $admin['id']]);
}

$sessao = criarSessao('admin', (int) $admin['id'], marcado('manter'));

responder([
    'ok' => true,
    'token' => $sessao['token'],
    'expira_em' => $sessao['expira_em'],
    'admin' => buscarAdmin((int) $admin['id']),
]);
