<?php

require __DIR__ . '/../base.php';

exigirMetodo('POST');

$tipo = texto('tipo', 10);
$id = lerInteiro('id', 'Cadastro', 1, PHP_INT_MAX);

if ($tipo === 'admin') {
    exigirPrincipal();
    $conta = consultar('select nome, papel, senha_hash is not null as ativo from administradores where id = ?', [$id])->fetch();
    if (!$conta) {
        falhar('Administrador não encontrado.', 404);
    }
    if ($conta['papel'] === 'principal') {
        falhar('A senha do administrador principal só pode ser trocada pelo Supabase.', 403);
    }
    $tabela = 'administradores';
} elseif ($tipo === 'usuario') {
    exigirAdmin();
    $conta = consultar('select nome, senha_hash is not null as ativo from usuarios where id = ?', [$id])->fetch();
    if (!$conta) {
        falhar('Usuário não encontrado.', 404);
    }
    $tabela = 'usuarios';
} else {
    falhar('Tipo de conta inválido.');
}

if (!$conta['ativo']) {
    falhar($tipo === 'admin'
        ? 'Este acesso ainda não foi ativado. A pessoa deve usar "Ativar acesso".'
        : 'Esta pessoa ainda não criou a conta. Ela deve usar "Criar conta" com o CPF e a data de nascimento.', 409);
}

$novo = novoCodigoRedefinicao();
$expira = consultar(
    "update {$tabela} set reset_hash = ?, reset_expira = now() + interval '24 hours', reset_tentativas = 0
     where id = ? returning reset_expira",
    [$novo['hash'], $id]
)->fetchColumn();

responder(['ok' => true, 'nome' => $conta['nome'], 'codigo' => $novo['codigo'], 'expira_em' => $expira]);
