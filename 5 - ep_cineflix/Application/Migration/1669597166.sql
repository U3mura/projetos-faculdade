CREATE TABLE cinemas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    nome_cinema TEXT NOT NULL,
    local_cinema TEXT NOT NULL
);
CREATE TABLE agendamentos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    cinema_id UUID NOT NULL,
    filme TEXT NOT NULL,
    horario_sessao TEXT NOT NULL,
    nome_completo TEXT NOT NULL
);
CREATE INDEX agendamentos_cinema_id_index ON agendamentos (cinema_id);
ALTER TABLE agendamentos ADD CONSTRAINT agendamentos_ref_cinema_id FOREIGN KEY (cinema_id) REFERENCES cinemas (id) ON DELETE CASCADE;
