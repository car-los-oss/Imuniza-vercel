<?php

require __DIR__ . '/../base.php';

exigirMetodo('POST');

$id = exigirUsuario();

$nome = obrigatorio('nome', 'Nome completo', 120);
$email = lerEmail();
$telefone = texto('telefone', 20);
$cidade = texto('cidade', 100);
$alergias = texto('alergias', 500);
$unidade = texto('unidade_saude', 120);

if (consultar('select 1 from usuarios where email = ? and id <> ?', [$email, $id])->fetchColumn()) {
    falhar('Este e-mail já está em uso em outra conta.', 409, 'email');
}

consultar(
    'update usuarios set nome = ?, email = ?, telefone = ?, cidade = ?, alergias = ?, unidade_saude = ? where id = ?',
    [$nome, $email, $telefone, $cidade, $alergias, $unidade, $id]
);

responder(['ok' => true, 'usuario' => buscarUsuario($id)]);
