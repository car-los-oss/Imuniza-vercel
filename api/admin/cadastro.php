<?php

require __DIR__ . '/../base.php';

exigirMetodo('POST');

$nome = obrigatorio('nome', 'Nome', 120);
$email = lerEmail();
$cpf = lerCpf();
$senhaHash = lerSenhaNova();

if (mb_strlen($nome) < 3) {
    falhar('Informe o nome completo.', 422, 'nome');
}

$pdo = conexao();
$pdo->beginTransaction();

$liberado = consultar(
    'select id, email, senha_hash from administradores where cpf = ? for update',
    [$cpf]
)->fetch();

if (!$liberado || $liberado['email'] !== $email) {
    $pdo->rollBack();
    falhar('Este CPF e e-mail não foram liberados. Peça ao administrador principal para liberar o seu acesso com os mesmos dados.', 403);
}

if ($liberado['senha_hash'] !== null) {
    $pdo->rollBack();
    falhar('Este acesso já foi ativado. Use a opção Entrar.', 409, 'cpf');
}

$id = (int) $liberado['id'];
consultar('update administradores set nome = ?, senha_hash = ? where id = ?', [$nome, $senhaHash, $id]);
$sessao = criarSessao('admin', $id, marcado('manter'));
$pdo->commit();

responder([
    'ok' => true,
    'token' => $sessao['token'],
    'expira_em' => $sessao['expira_em'],
    'admin' => buscarAdmin($id),
], 201);
