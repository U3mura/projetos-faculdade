ALTER TABLE agendamentos DROP COLUMN horario_sessao;
ALTER TABLE agendamentos ADD COLUMN horario_sessao TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL;
