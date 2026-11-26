begin;

create table administradores (
    id bigint generated always as identity primary key,
    nome varchar(120) not null,
    email varchar(160) not null unique,
    cpf char(11) not null unique check (cpf ~ '^[0-9]{11}$'),
    senha_hash varchar(255) not null,
    telefone varchar(20),
    data_nascimento date,
    sexo varchar(20),
    cidade varchar(100),
    uf char(2),
    criado_em timestamptz not null default now()
);

create table usuarios (
    id bigint generated always as identity primary key,
    nome varchar(120) not null,
    email varchar(160) not null unique,
    cpf char(11) not null unique check (cpf ~ '^[0-9]{11}$'),
    senha_hash varchar(255) not null,
    telefone varchar(20),
    data_nascimento date,
    tipo_sanguineo varchar(3) check (tipo_sanguineo in ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    sexo varchar(20),
    cidade varchar(100),
    uf char(2),
    alergias text,
    medicamentos_continuos text,
    unidade_saude varchar(120),
    doador_orgaos boolean,
    criado_em timestamptz not null default now()
);

create table vacinas (
    id bigint generated always as identity primary key,
    nome varchar(100) not null unique,
    total_doses smallint not null default 1 check (total_doses >= 1),
    intervalo_dias integer check (intervalo_dias >= 0),
    descricao text
);

create table doses (
    id bigint generated always as identity primary key,
    usuario_id bigint not null references usuarios (id) on delete cascade,
    vacina_id bigint not null references vacinas (id),
    numero_dose smallint not null check (numero_dose >= 1),
    status varchar(10) not null default 'pendente' check (status in ('aplicada', 'pendente')),
    data_prevista date,
    data_aplicacao date,
    lote varchar(40),
    local_aplicacao varchar(120),
    criado_em timestamptz not null default now(),
    unique (usuario_id, vacina_id, numero_dose),
    check (status = 'pendente' or data_aplicacao is not null)
);

create table eventos (
    id bigint generated always as identity primary key,
    administrador_id bigint references administradores (id) on delete set null,
    vacina_id bigint not null references vacinas (id),
    dose varchar(30),
    lote varchar(40),
    data_evento date not null,
    duracao_dias integer check (duracao_dias >= 1),
    publico_alvo varchar(80),
    local_aplicacao varchar(120),
    status varchar(10) not null default 'pendente' check (status in ('enviado', 'pendente')),
    criado_em timestamptz not null default now()
);

create table sessoes (
    token_hash char(64) primary key,
    usuario_id bigint references usuarios (id) on delete cascade,
    administrador_id bigint references administradores (id) on delete cascade,
    expira_em timestamptz not null,
    criado_em timestamptz not null default now(),
    check ((usuario_id is null) <> (administrador_id is null))
);

create index doses_usuario_idx on doses (usuario_id);
create index eventos_data_idx on eventos (data_evento);
create index sessoes_expira_idx on sessoes (expira_em);

alter table administradores enable row level security;
alter table usuarios enable row level security;
alter table vacinas enable row level security;
alter table doses enable row level security;
alter table eventos enable row level security;
alter table sessoes enable row level security;

insert into vacinas (nome, total_doses, intervalo_dias) values
    ('BCG', 1, null),
    ('Hepatite B', 3, 30),
    ('Febre Amarela', 1, null),
    ('Gripe (Influenza)', 1, null),
    ('Tríplice Viral (Sarampo)', 2, 90),
    ('Covid-19', 2, 28),
    ('dT (Tétano e Difteria)', 3, 60);

commit;
