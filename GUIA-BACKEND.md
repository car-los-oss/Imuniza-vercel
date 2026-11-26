# Imuniza — back-end pronto (25/11, atualizado às 23h50)

**Publicado em:** https://imuniza-vercel.onrender.com (Render, região Virginia, plano Free), ligado ao Supabase `Imuniza` (`ecutrhfnsvilegatygec`). Código na `main` do GitHub (PR #1). A senha do banco fica só nas variáveis de ambiente do Render e no `config.php` de cada computador.

O back-end está completo: PHP + PostgreSQL (Supabase), com login por token. Todas as 14 telas agora usam dados reais do banco, não há mais nada fixo no HTML.

## O que tem no pacote

| Pasta / arquivo | O que é |
|---|---|
| `api/base.php` | Conexão, respostas JSON, validações (CPF, datas, e-mail) e login por token |
| `api/usuario/*.php` | Criar conta, entrar, perfil, resumo do Início, histórico, calendário |
| `api/admin/*.php` | Ativar acesso, entrar, perfil, liberar administradores, gerar código de senha, visão geral, envio de eventos, histórico de envios, cadastro e busca, registrar dose, alcance |
| `api/vacinas.php`, `api/sair.php`, `api/teste.php`, `api/carteira.php`, `api/redefinir.php` | Lista de vacinas, sair da conta, teste de conexão, comprovante público do QR, troca de senha com código |
| `assets/js/app.js` | Reescrito: liga as telas na API (sem comentários) |
| `config/config.example.php` | Modelo da configuração local do banco |
| `banco/schema.sql` | As tabelas (já rodado no Supabase em 26/10, não precisa rodar de novo) |
| `banco/atualizacao.sql` | Ajustes que as telas precisam. Pode rodar mais de uma vez (rodar de novo sempre que vier uma versão nova) |
| `banco/dados-teste.sql` | Contas e dados de teste com datas relativas ao dia em que rodar |
| `Dockerfile`, `.dockerignore`, `.htaccess`, `.gitignore` | Publicação no Render e proteção das pastas |

## Passo 1 — Banco no Supabase

1. Abra o projeto `Imuniza` no Supabase. Se aparecer **Project is paused**, clique em **Resume project** e espere até o status voltar a ficar verde (leva alguns minutos).
2. Vá em **SQL Editor** → **New query**, cole todo o `banco/atualizacao.sql` e clique em **Run**. Deve aparecer "Success".
3. Nova query com todo o `banco/dados-teste.sql` → **Run**.
4. Confira no **Table Editor**: as tabelas `usuarios`, `doses`, `eventos` e `administradores` agora têm dados (pelo menos 3 usuários, 19 doses, 6 eventos e 2 administradores). Na `administradores`, a Amélia aparece com `papel` = `principal`.

O `dados-teste.sql` apaga e recria só as contas de teste. Dá para rodar de novo na véspera da apresentação, para as datas ficarem atualizadas.

## Passo 2 — Rodar no XAMPP

1. Renomeie a pasta antiga `C:\xampp\htdocs\imuniza` para `imuniza-antigo` (backup).
2. Descompacte o zip em `C:\xampp\htdocs\imuniza`.
3. Copie `config\config.example.php` para `config\config.php` e preencha com os dados do Supabase (**Connect** → **Session pooler**): host, porta 5432, usuário `postgres.<código>` e a senha do banco.
4. Confira se `extension=pdo_pgsql` e `extension=pgsql` estão sem `;` no `php.ini` e reinicie o Apache.
5. Abra `http://localhost/imuniza/api/teste.php`. Tem que aparecer `"ok":true` e `"atualizacao_ok":true`.
6. Abra `http://localhost/imuniza/` e entre com uma conta de teste.

O `config.php` tem a senha do banco: ele está no `.gitignore` e não pode subir para o GitHub.

## Passo 3 — Publicar no Render

1. Suba o código para o GitHub (branch `feature/backend` → Pull Request → merge na `main`).
2. No Render: **New** → **Web Service** → escolha o repositório `Imuniza-vercel`.
3. Runtime **Docker**, região **Virginia (US East)**, plano **Free**.
4. Em **Environment Variables**, adicione:

| Nome | Valor |
|---|---|
| `DB_HOST` | host do Session pooler |
| `DB_PORT` | `5432` |
| `DB_NAME` | `postgres` |
| `DB_USER` | `postgres.<código-do-projeto>` |
| `DB_PASSWORD` | senha do banco |
| `DB_SSLMODE` | `require` |

5. **Create Web Service**. Quando terminar, abra `https://<seu-app>.onrender.com/api/teste.php`.

O plano grátis do Render "dorme" depois de 15 minutos parado; o primeiro acesso depois disso leva uns 50 segundos. Antes da apresentação, abra o site uma vez para ele acordar.

A Vercel não roda PHP: lá as telas abrem, mas o login não funciona. O link oficial passa a ser o do Render.

## Contas de teste

Senha de todas: `Imuniza@2026`.

| Quem | Login | Situação |
|---|---|---|
| Laurêncio Silva | CPF `987.654.321-00` | Usuário principal: próxima dose em 10 dias, 1 dose atrasada, campanhas ativas |
| Helena Costa | CPF `111.444.777-35` | Bebê de 7 meses ("Menores de 1 ano") |
| José Pereira | CPF `222.555.888-46` | Idoso, cadastro sem tipo sanguíneo (gera "pendência de dados") |
| Amélia Oliveira (admin) | `ameliaoliveira@email.com` | Administradora **principal** da UBS Central: é quem libera outros administradores |
| Bruno Almeida (admin) | `bruno.almeida@email.com`, CPF `529.982.247-25` | Liberado pela Amélia, mas ainda sem senha. Serve para mostrar o "Ativar acesso" na apresentação |

Para "Criar conta" de usuário, agora também é pedida a data de nascimento.

## Decisões tomadas

- **Administradores só com liberação**: existe um administrador principal (a Amélia). Em **Meu perfil**, ele vê a seção **Administradores** e libera uma pessoa informando nome, CPF, e-mail e unidade. Só depois disso a pessoa consegue usar **Ativar acesso**, na tela de entrada do painel, com o mesmo CPF e e-mail, e criar a senha. Quem não foi liberado recebe a mensagem "Este CPF e e-mail não foram liberados". O principal também pode remover o acesso de um administrador comum. Administradores comuns não veem essa seção. Para tornar outra pessoa principal, só pelo SQL Editor: `update administradores set papel = 'principal' where email = 'email@da.pessoa';`
- **Pré-cadastro protegido pela data de nascimento**: a UBS agora precisa informar a data de nascimento ao cadastrar. Para assumir esse cadastro em "Criar conta", a pessoa precisa digitar a mesma data. Se não bater, aparece "Os dados não conferem com o cadastro feito pela unidade de saúde".
- **Pré-cadastro pela UBS**: o admin cadastra a pessoa com CPF, data de nascimento e dados de saúde. Quando a pessoa clica em "Criar conta" com o mesmo CPF e a mesma data de nascimento, ela define e-mail e senha e já encontra o histórico. Se tentar "Entrar" antes, o site explica o que fazer.
- **Registrar dose**: em Cadastro e Busca, clicar numa pessoa abre a ficha com o formulário "Registrar dose aplicada". Se a vacina tem mais doses, a próxima é agendada sozinha (data + intervalo da vacina).
- **Envio de eventos**: a vacina vem do banco, a duração é em dias (número), ganhou o campo opcional "Nome do evento" e o alcance é calculado pela idade das pessoas cadastradas.
- **Tipo sanguíneo**: a tela mostra "A−", mas envia "A-", que é o que o banco aceita.
- **Senha**: mínimo de 8 caracteres. "Manter conectado" guarda o login por 30 dias; sem marcar, por 12 horas ou até fechar o navegador.

## QR Code e comprovante

- Cada usuário tem um código secreto da carteira (32 letras e números, gerado no primeiro acesso à Carteira ou ao Perfil).
- O QR Code da Carteira e do Perfil leva para `verificar.html?c=<código>`, uma página pública que a UBS abre escaneando com o celular. Ela mostra nome, CPF mascarado (`***.654.321-**`), nascimento, unidade, as doses aplicadas e quantas vacinas têm doses pendentes.
- "Baixar comprovante" abre essa página, que tem o botão **Imprimir ou salvar em PDF**. O comprovante sai em uma página A4.
- **Trocar código do QR**, na Carteira, gera um código novo; o QR e o link antigos deixam de funcionar.
- Biblioteca usada: qrcode-generator (MIT), em `assets/js/qrcode.min.js`. O aviso de licença está em `TERCEIROS.md`.

## Esqueci a senha

O sistema não envia e-mail, então a troca de senha funciona com um **código temporário** gerado no painel:

- **Usuário:** em Cadastro e Busca, o administrador abre a pessoa e clica em **Gerar código para nova senha**. A pessoa entra em "Esqueci a senha" (tela de login), informa CPF, código e a senha nova.
- **Administrador:** o principal clica em **Código de senha** na seção Administradores do Meu perfil. A pessoa usa "Esqueci a senha" na tela de entrada do painel, com e-mail, código e senha nova.
- O código tem 8 letras e números (ex.: `WAZW-ZD7M`), vale **24 horas**, funciona **uma vez** e é cancelado depois de **5 tentativas erradas**. Ao trocar a senha, a pessoa é desconectada de todos os aparelhos.
- A senha do administrador principal só pode ser trocada pelo Supabase.

## Limitações (bom saber para a banca)

- O sistema não envia e-mail nem notificação no celular: os avisos de campanha aparecem dentro do site.

## Como foi testado

- Todos os endpoints testados com dados certos e errados (CPF inválido, e-mail repetido, senha curta, data no passado, token de usuário em rota de admin etc.).
- As 14 telas abertas num navegador automático, no tamanho desktop e no celular, sem nenhum erro de JavaScript.
- Fluxos completos: criar conta de admin → cadastrar pessoa → registrar dose → a pessoa cria a conta → vê a próxima dose no Início → edita o perfil → sai.
- Liberação de administradores: ativar sem liberação é recusado, o principal libera e remove, o administrador comum não consegue liberar (nem pela API) e a pessoa liberada ativa e entra.
- Pré-cadastro: tentar assumir com a data de nascimento errada é recusado; com a data certa, entra.
- QR Code: a imagem do QR foi lida por um leitor de QR (no tamanho de computador e de celular) e leva ao comprovante certo; depois de trocar o código, o link antigo é recusado; o comprovante sai em 1 página A4.
- Esqueci a senha: código errado, CPF de outra pessoa, código reutilizado e 5 tentativas erradas são recusados; com o código certo (até digitado em minúsculas), a senha muda e as sessões antigas caem.
- A imagem Docker (a mesma que o Render vai usar) foi construída e testada com o Apache.
