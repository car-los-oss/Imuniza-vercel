<?php

require __DIR__ . '/../base.php';

exigirMetodo('POST');

$cpf = lerCpf();
$senha = (string) (entrada()['senha'] ?? '');
if ($senha === '') {
    falhar('Preencha o campo Senha.', 422, 'senha');
}

$usuario = consultar('select id, senha_hash from usuarios where cpf = ?', [$cpf])->fetch();

if ($usuario && $usuario['senha_hash'] === null) {
    falhar('Seu cadastro foi feito pela unidade de saúde. Clique em "Criar conta" com o mesmo CPF e a mesma data de nascimento para definir sua senha.', 409, 'cpf');
}

if (!$usuario || !password_verify($senha, $usuario['senha_hash'])) {
    falhar('CPF ou senha incorretos.', 401);
}

if (password_needs_rehash($usuario['senha_hash'], PASSWORD_DEFAULT)) {
    consultar('update usuarios set senha_hash = ? where id = ?', [password_hash($senha, PASSWORD_DEFAULT), (int) $usuario['id']]);
}

$sessao = criarSessao('usuario', (int) $usuario['id'], marcado('manter'));

responder([
    'ok' => true,
    'token' => $sessao['token'],
    'expira_em' => $sessao['expira_em'],
    'usuario' => buscarUsuario((int) $usuario['id']),
]);
