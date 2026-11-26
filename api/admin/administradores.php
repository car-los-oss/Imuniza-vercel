<?php

require __DIR__ . '/../base.php';

exigirMetodo('GET', 'POST', 'DELETE');

$principalId = exigirPrincipal();

if (metodo() === 'GET') {
    $admins = consultar(
        "select a.id, a.nome, a.email, a.cpf, a.unidade_saude, a.papel, a.senha_hash is not null as ativo,
                l.nome as liberado_por, a.criado_em
         from administradores a
         left join administradores l on l.id = a.liberado_por
         order by a.papel = 'principal' desc, a.nome"
    )->fetchAll();
    foreach ($admins as &$a) {
        $a['id'] = (int) $a['id'];
        $a['ativo'] = (bool) $a['ativo'];
    }
    unset($a);
    responder(['ok' => true, 'administradores' => $admins]);
}

if (metodo() === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    $alvo = consultar('select id, nome, papel from administradores where id = ?', [$id])->fetch();
    if (!$alvo) {
        falhar('Administrador não encontrado.', 404);
    }
    if ($alvo['papel'] === 'principal') {
        falhar('O administrador principal não pode ser removido por aqui.', 403);
    }
    consultar('delete from administradores where id = ?', [$id]);
    responder(['ok' => true, 'removido' => $alvo['nome']]);
}

$nome = obrigatorio('nome', 'Nome', 120);
$email = lerEmail();
$cpf = lerCpf();
$unidade = texto('unidade_saude', 120);

if (consultar('select 1 from administradores where cpf = ?', [$cpf])->fetchColumn()) {
    falhar('Já existe um administrador com este CPF.', 409, 'cpf');
}
if (consultar('select 1 from administradores where email = ?', [$email])->fetchColumn()) {
    falhar('Este e-mail já está em uso por outro administrador.', 409, 'email');
}

try {
    $id = (int) consultar(
        "insert into administradores (nome, email, cpf, unidade_saude, papel, liberado_por)
         values (?, ?, ?, ?, 'admin', ?) returning id",
        [$nome, $email, $cpf, $unidade, $principalId]
    )->fetchColumn();
} catch (PDOException $erro) {
    if (violouUnico($erro)) {
        falhar('CPF ou e-mail já liberado.', 409);
    }
    throw $erro;
}

responder(['ok' => true, 'admin' => buscarAdmin($id)], 201);
