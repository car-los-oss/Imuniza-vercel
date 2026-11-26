<?php

require __DIR__ . '/base.php';

exigirMetodo('POST');

$tipo = texto('tipo', 10) === 'admin' ? 'admin' : 'usuario';

if ($tipo === 'admin') {
    $tabela = 'administradores';
    $coluna = 'email';
    $identificador = lerEmail();
    $sessoes = 'administrador_id';
} else {
    $tabela = 'usuarios';
    $coluna = 'cpf';
    $identificador = lerCpf();
    $sessoes = 'usuario_id';
}

$codigo = normalizarCodigoRedefinicao(texto('codigo', 20));
if (strlen($codigo) !== 8) {
    falhar('Digite o código de 8 letras e números que você recebeu.', 422, 'codigo');
}
$senhaHash = lerSenhaNova();

$pdo = conexao();
$pdo->beginTransaction();

$conta = consultar(
    "select id, reset_hash, reset_expira > now() as valido, reset_tentativas
     from {$tabela} where {$coluna} = ? for update",
    [$identificador]
)->fetch();

$invalido = $tipo === 'admin'
    ? 'E-mail ou código inválido, ou o código já venceu. Peça um novo ao administrador principal.'
    : 'CPF ou código inválido, ou o código já venceu. Peça um novo na sua unidade de saúde.';

if (!$conta || $conta['reset_hash'] === null || !$conta['valido']) {
    $pdo->rollBack();
    falhar($invalido, 403);
}

if (!hash_equals($conta['reset_hash'], hash('sha256', $codigo))) {
    $tentativas = (int) $conta['reset_tentativas'] + 1;
    if ($tentativas >= 5) {
        consultar("update {$tabela} set reset_hash = null, reset_expira = null, reset_tentativas = 0 where id = ?", [(int) $conta['id']]);
        $pdo->commit();
        falhar('Código errado 5 vezes. Por segurança, ele foi cancelado: peça um novo.', 403, 'codigo');
    }
    consultar("update {$tabela} set reset_tentativas = ? where id = ?", [$tentativas, (int) $conta['id']]);
    $pdo->commit();
    falhar($invalido, 403, 'codigo');
}

consultar(
    "update {$tabela} set senha_hash = ?, reset_hash = null, reset_expira = null, reset_tentativas = 0 where id = ?",
    [$senhaHash, (int) $conta['id']]
);
consultar("delete from sessoes where {$sessoes} = ?", [(int) $conta['id']]);
$pdo->commit();

responder(['ok' => true]);
