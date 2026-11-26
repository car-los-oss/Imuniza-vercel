<?php

require __DIR__ . '/../base.php';

exigirMetodo('POST');

$nome = obrigatorio('nome', 'Nome', 120);
$email = lerEmail();
$cpf = lerCpf();
$senhaHash = lerSenhaNova();
$unidade = texto('unidade_saude', 120);

if (mb_strlen($nome) < 3) {
    falhar('Informe o nome completo.', 422, 'nome');
}

if (consultar('select 1 from administradores where cpf = ?', [$cpf])->fetchColumn()) {
    falhar('Já existe um administrador com este CPF.', 409, 'cpf');
}
if (consultar('select 1 from administradores where email = ?', [$email])->fetchColumn()) {
    falhar('Este e-mail já está em uso.', 409, 'email');
}

$pdo = conexao();
$pdo->beginTransaction();
try {
    $id = (int) consultar(
        'insert into administradores (nome, email, cpf, senha_hash, unidade_saude) values (?, ?, ?, ?, ?) returning id',
        [$nome, $email, $cpf, $senhaHash, $unidade]
    )->fetchColumn();
    $sessao = criarSessao('admin', $id, marcado('manter'));
    $pdo->commit();
} catch (PDOException $erro) {
    $pdo->rollBack();
    if (violouUnico($erro)) {
        falhar('CPF ou e-mail já cadastrado.', 409);
    }
    throw $erro;
}

responder([
    'ok' => true,
    'token' => $sessao['token'],
    'expira_em' => $sessao['expira_em'],
    'admin' => buscarAdmin($id),
], 201);
