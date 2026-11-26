begin;

alter table eventos add column if not exists titulo varchar(120);
alter table eventos add column if not exists observacoes text;
alter table usuarios add column if not exists observacoes text;
alter table administradores add column if not exists unidade_saude varchar(120);

alter table usuarios alter column email drop not null;
alter table usuarios alter column senha_hash drop not null;

create index if not exists sessoes_usuario_idx on sessoes (usuario_id);
create index if not exists sessoes_admin_idx on sessoes (administrador_id);

create or replace function imuniza_no_publico(nascimento date, publico text)
returns boolean
language sql
stable
as $$
    select case
        when publico is null or publico = '' then true
        when nascimento is null then false
        when publico = 'Menores de 1 ano' then age(current_date, nascimento) < interval '1 year'
        when publico = '6 meses a 5 anos' then age(current_date, nascimento) >= interval '6 months'
                                          and age(current_date, nascimento) < interval '6 years'
        when publico = 'Crianças e adolescentes' then age(current_date, nascimento) < interval '18 years'
        when publico = 'Adultos 18+' then age(current_date, nascimento) >= interval '18 years'
        when publico = 'Adultos 20+' then age(current_date, nascimento) >= interval '20 years'
        when publico = 'Idosos 60+' then age(current_date, nascimento) >= interval '60 years'
        else true
    end
$$;

commit;
