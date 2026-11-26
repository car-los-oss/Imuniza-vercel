begin;

delete from eventos where administrador_id in (
    select id from administradores
    where cpf in ('12345678909', '52998224725') or email in ('ameliaoliveira@email.com', 'bruno.almeida@email.com')
);
delete from administradores where liberado_por in (
    select id from administradores where cpf = '12345678909' or email = 'ameliaoliveira@email.com'
) and cpf <> '12345678909';
delete from administradores
where cpf in ('12345678909', '52998224725') or email in ('ameliaoliveira@email.com', 'bruno.almeida@email.com');
delete from usuarios where cpf in ('98765432100', '11144477735', '22255588846')
    or email in ('laurencio@email.com', 'helena.mae@email.com', 'jose.pereira@email.com');

insert into administradores (nome, email, cpf, senha_hash, telefone, data_nascimento, sexo, cidade, uf, unidade_saude, papel) values
    ('Amélia Oliveira', 'ameliaoliveira@email.com', '12345678909',
     '$2y$10$G.BT4JpZgH8S6xNyAGA6Pu5zJL8.QmN5ul8oBJGOJPQEDH/7Th3Yi',
     '(18) 99999-2222', '1990-10-10', 'Feminino', 'Assis', 'SP', 'UBS Central', 'principal');

insert into administradores (nome, email, cpf, senha_hash, unidade_saude, papel, liberado_por)
select 'Bruno Almeida', 'bruno.almeida@email.com', '52998224725', null, 'UBS Vila Nova', 'admin', id
from administradores where cpf = '12345678909';

insert into usuarios (nome, email, cpf, senha_hash, telefone, data_nascimento, tipo_sanguineo, sexo, cidade, uf,
                      alergias, medicamentos_continuos, unidade_saude, doador_orgaos) values
    ('Laurêncio Silva', 'laurencio@email.com', '98765432100',
     '$2y$10$G.BT4JpZgH8S6xNyAGA6Pu5zJL8.QmN5ul8oBJGOJPQEDH/7Th3Yi',
     '(18) 99999-0000', '2010-10-10', 'O+', 'Masculino', 'Assis', 'SP',
     'Penicilina', 'Não', 'UBS Central', false),
    ('Helena Costa', 'helena.mae@email.com', '11144477735',
     '$2y$10$G.BT4JpZgH8S6xNyAGA6Pu5zJL8.QmN5ul8oBJGOJPQEDH/7Th3Yi',
     '(18) 98888-1111', current_date - interval '7 months', 'A+', 'Feminino', 'Tarumã', 'SP',
     null, 'Não', 'UBS Central', null),
    ('José Pereira', 'jose.pereira@email.com', '22255588846',
     '$2y$10$G.BT4JpZgH8S6xNyAGA6Pu5zJL8.QmN5ul8oBJGOJPQEDH/7Th3Yi',
     '(18) 97777-3333', '1955-04-02', null, 'Masculino', 'Assis', 'SP',
     'Dipirona', 'Sim', null, true);

insert into doses (usuario_id, vacina_id, numero_dose, status, data_prevista, data_aplicacao, lote, local_aplicacao)
select u.id, v.id, d.numero, d.status, d.prevista, d.aplicada, d.lote, d.local
from (values
    ('98765432100', 'BCG',                      1, 'aplicada', null::date,              date '2010-10-11',      'BCG10A221',    'UBS Centro'),
    ('98765432100', 'Tríplice Viral (Sarampo)', 1, 'aplicada', null,                    date '2011-10-10',      'SR2011B114',   'UBS Centro'),
    ('98765432100', 'Tríplice Viral (Sarampo)', 2, 'aplicada', null,                    date '2012-01-10',      'SR2012B902',   'UBS Centro'),
    ('98765432100', 'Covid-19',                 1, 'aplicada', null,                    date '2022-01-15',      'CV2022A1180',  'UBS Vila Nova'),
    ('98765432100', 'Covid-19',                 2, 'aplicada', null,                    date '2022-02-12',      'CV2022A4471',  'UBS Vila Nova'),
    ('98765432100', 'Gripe (Influenza)',        1, 'aplicada', null,                    date '2026-05-10',      'GR2026X118',   'UBS Central'),
    ('98765432100', 'Hepatite B',               1, 'aplicada', null,                    current_date - 20,      'BTTn40028922', 'UBS Centro'),
    ('98765432100', 'Hepatite B',               2, 'pendente', current_date + 10,       null,                   null,           'UBS Centro'),
    ('98765432100', 'Hepatite B',               3, 'pendente', current_date + 40,       null,                   null,           'UBS Centro'),
    ('98765432100', 'Febre Amarela',            1, 'pendente', current_date + 25,       null,                   null,           'UBS Vila Nova'),
    ('98765432100', 'dT (Tétano e Difteria)',   1, 'pendente', current_date - 55,       null,                   null,           'UBS Central'),
    ('11144477735', 'BCG',                      1, 'aplicada', null,                    (current_date - interval '7 months')::date + 1,  'BCG26A031', 'UBS Central'),
    ('11144477735', 'Hepatite B',               1, 'aplicada', null,                    (current_date - interval '7 months')::date,      'BTTn26A100', 'UBS Central'),
    ('11144477735', 'Hepatite B',               2, 'aplicada', null,                    (current_date - interval '7 months')::date + 30, 'BTTn26A188', 'UBS Central'),
    ('11144477735', 'Hepatite B',               3, 'pendente', current_date + 5,        null,                   null,           'UBS Central'),
    ('22255588846', 'Covid-19',                 1, 'aplicada', null,                    date '2021-04-10',      'CV2021A0090',  'UBS Central'),
    ('22255588846', 'Covid-19',                 2, 'aplicada', null,                    date '2021-05-08',      'CV2021A0412',  'UBS Central'),
    ('22255588846', 'Gripe (Influenza)',        1, 'aplicada', null,                    date '2026-04-20',      'GR2026X031',   'UBS Central'),
    ('22255588846', 'dT (Tétano e Difteria)',   1, 'pendente', current_date + 15,       null,                   null,           'UBS Central')
) as d (cpf, vacina, numero, status, prevista, aplicada, lote, local)
join usuarios u on u.cpf = d.cpf
join vacinas v on v.nome = d.vacina;

insert into eventos (administrador_id, vacina_id, titulo, dose, lote, data_evento, duracao_dias, publico_alvo,
                     local_aplicacao, status, observacoes)
select a.id, v.id, e.titulo, e.dose, e.lote, e.inicio, e.dias, e.publico, e.local, e.status, e.obs
from (values
    ('Gripe (Influenza)',        'Campanha de Gripe',  'Dose única', 'GR2026X200',  current_date - 10,  25, 'Idosos 60+',              'UBS Central',   'enviado',  'Levar documento com foto e a carteira de vacinação.'),
    ('Febre Amarela',            'Febre Amarela',      'Dose única', 'FA2026B010',  current_date - 5,   15, 'Adultos 18+',             'UBS Vila Nova', 'enviado',  null),
    ('Tríplice Viral (Sarampo)', 'Multivacinação',     '1ª dose',    'SR2026C330',  current_date + 12,  10, 'Crianças e adolescentes', 'UBS Centro',    'enviado',  'Crianças devem estar acompanhadas de um responsável.'),
    ('dT (Tétano e Difteria)',   'Reforço de Tétano',  'Reforço',    'DT2026A077',  current_date - 60,  15, 'Adultos 20+',             'UBS Central',   'enviado',  null),
    ('Covid-19',                 'Reforço Covid-19',   'Reforço',    'CV2026R015',  date '2026-03-02',  19, 'Adultos 18+',             'UBS Central',   'enviado',  null),
    ('Hepatite B',               'Hepatite B',         '1ª dose',    'BTTn26D001',  current_date + 20,  7,  'Menores de 1 ano',        'UBS Central',   'pendente', null)
) as e (vacina, titulo, dose, lote, inicio, dias, publico, local, status, obs)
join vacinas v on v.nome = e.vacina
cross join administradores a
where a.cpf = '12345678909';

commit;
