<?php

require __DIR__ . '/../base.php';

exigirMetodo('POST');

$nome = obrigatorio('nome', 'Nome completo', 120);
$email = lerEmail();
$cpf = lerCpf();
$senhaHash = lerSenhaNova();
$manter = marcado('manter');

if (mb_strlen($nome) < 3) {
    falhar('Informe o nome completo.', 422, 'nome');
}

$pdo = conexao();
$pdo->beginTransaction();

$existente = consultar('select id, senha_hash from usuarios where cpf = ? for update', [$cpf])->fetch();
if ($existente && $existente['senha_hash'] !== null) {
    $pdo->rollBack();
    falhar('Já existe uma conta com este CPF. Use a opção Entrar.', 409, 'cpf');
}

$emailEmUso = consultar(
    'select 1 from usuarios where email = ? and id <> ?',
    [$email, $existente ? (int) $existente['id'] : 0]
)->fetchColumn();
if ($emailEmUso) {
    $pdo->rollBack();
    falhar('Este e-mail já está em uso em outra conta.', 409, 'email');
}

try {
    if ($existente) {
        consultar(
            'update usuarios set nome = ?, email = ?, senha_hash = ? where id = ?',
            [$nome, $email, $senhaHash, (int) $existente['id']]
        );
        $id = (int) $existente['id'];
    } else {
        $id = (int) consultar(
            'insert into usuarios (nome, email, cpf, senha_hash) values (?, ?, ?, ?) returning id',
            [$nome, $email, $cpf, $senhaHash]
        )->fetchColumn();
    }
    $sessao = criarSessao('usuario', $id, $manter);
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
    'pre_cadastro' => (bool) $existente,
    'usuario' => buscarUsuario($id),
], 201);
