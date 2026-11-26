<?php

require __DIR__ . '/base.php';

exigirMetodo('GET');

$linha = consultar(
    "select current_database() as banco, to_char(now(), 'DD/MM/YYYY HH24:MI') as agora,
            (select count(*) from vacinas) as vacinas,
            (select count(*) from usuarios) as usuarios,
            exists (select 1 from information_schema.columns
                    where table_name = 'eventos' and column_name = 'titulo') as atualizacao_ok"
)->fetch();

responder([
    'ok' => true,
    'mensagem' => 'Conectado ao banco.',
    'banco' => $linha['banco'],
    'agora' => $linha['agora'],
    'vacinas' => (int) $linha['vacinas'],
    'usuarios' => (int) $linha['usuarios'],
    'atualizacao_ok' => (bool) $linha['atualizacao_ok'],
]);
