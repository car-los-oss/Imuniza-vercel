<?php

require __DIR__ . '/../base.php';

exigirMetodo('POST');

$id = exigirAdmin();

$nome = obrigatorio('nome', 'Nome', 120);
$email = lerEmail();
$telefone = texto('telefone', 20);
$unidade = texto('unidade_saude', 120);

if (consultar('select 1 from administradores where email = ? and id <> ?', [$email, $id])->fetchColumn()) {
    falhar('Este e-mail já está em uso.', 409, 'email');
}

consultar(
    'update administradores set nome = ?, email = ?, telefone = ?, unidade_saude = ? where id = ?',
    [$nome, $email, $telefone, $unidade, $id]
);

responder(['ok' => true, 'admin' => buscarAdmin($id)]);
