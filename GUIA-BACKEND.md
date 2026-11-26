# Imuniza — back-end pronto (25/11)

O back-end está completo: PHP + PostgreSQL (Supabase), com login por token. Todas as 14 telas agora usam dados reais do banco, não há mais nada fixo no HTML.

## O que tem no pacote

| Pasta / arquivo | O que é |
|---|---|
| `api/base.php` | Conexão, respostas JSON, validações (CPF, datas, e-mail) e login por token |
| `api/usuario/*.php` | Criar conta, entrar, perfil, resumo do Início, histórico, calendário |
| `api/admin/*.php` | Criar conta, entrar, perfil, visão geral, envio de eventos, histórico de envios, cadastro e busca, registrar dose, alcance |
| `api/vacinas.php`, `api/sair.php`, `api/teste.php` | Lista de vacinas, sair da conta, teste de conexão |
| `assets/js/app.js` | Reescrito: liga as telas na API (sem comentários) |
| `config/config.example.php` | Modelo da configuração local do banco |
| `banco/schema.sql` | As tabelas (já rodado no Supabase em 26/10, não precisa rodar de novo) |
| `banco/atualizacao.sql` | Ajustes que as telas precisam. Pode rodar mais de uma vez |
| `banco/dados-teste.sql` | Contas e dados de teste com datas relativas ao dia em que rodar |
| `Dockerfile`, `.dockerignore`, `.htaccess`, `.gitignore` | Publicação no Render e proteção das pastas |

## Passo 1 — Banco no Supabase

1. Abra o projeto `imuniza` no Supabase. Se aparecer **Paused**, clique em **Restore** e espere alguns minutos.
2. Vá em **SQL Editor** → **New query**, cole todo o `banco/atualizacao.sql` e clique em **Run**. Deve aparecer "Success".
3. Nova query com todo o `banco/dados-teste.sql` → **Run**.
4. Confira no **Table Editor**: as tabelas `usuarios`, `doses`, `eventos` e `administradores` agora têm dados (pelo menos 3 usuários, 19 doses, 6 eventos e 1 administrador).

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
| Amélia Oliveira (admin) | `ameliaoliveira@email.com` | Administradora da UBS Central |

## Decisões tomadas

- **Pré-cadastro pela UBS**: o admin cadastra a pessoa só com CPF e dados de saúde. Quando a pessoa clica em "Criar conta" com o mesmo CPF, ela define e-mail e senha e já encontra o histórico. Se tentar "Entrar" antes, o site explica o que fazer.
- **Registrar dose**: em Cadastro e Busca, clicar numa pessoa abre a ficha com o formulário "Registrar dose aplicada". Se a vacina tem mais doses, a próxima é agendada sozinha (data + intervalo da vacina).
- **Envio de eventos**: a vacina vem do banco, a duração é em dias (número), ganhou o campo opcional "Nome do evento" e o alcance é calculado pela idade das pessoas cadastradas.
- **Tipo sanguíneo**: a tela mostra "A−", mas envia "A-", que é o que o banco aceita.
- **Senha**: mínimo de 8 caracteres. "Manter conectado" guarda o login por 30 dias; sem marcar, por 12 horas ou até fechar o navegador.

## Limitações (bom saber para a banca)

- Qualquer pessoa consegue criar conta de administrador em "Solicitar acesso". Num sistema real, isso passaria por aprovação.
- O pré-cadastro é assumido por quem souber o CPF. Num sistema real, pediria também a data de nascimento ou um código da UBS.
- "Esqueci a senha" só orienta a procurar a unidade, porque o sistema não envia e-mail.
- O QR Code da carteira continua ilustrativo.

## Como foi testado

- Todos os endpoints testados com dados certos e errados (CPF inválido, e-mail repetido, senha curta, data no passado, token de usuário em rota de admin etc.).
- As 14 telas abertas num navegador automático, no tamanho desktop e no celular, sem nenhum erro de JavaScript.
- Fluxos completos: criar conta de admin → cadastrar pessoa → registrar dose → a pessoa cria a conta → vê a próxima dose no Início → edita o perfil → sai.
- A imagem Docker (a mesma que o Render vai usar) foi construída e testada com o Apache.
