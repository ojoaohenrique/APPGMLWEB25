-- Adicionar coluna quais_vicios à tabela moradores
ALTER TABLE public.moradores
ADD COLUMN quais_vicios TEXT;

COMMENT ON COLUMN public.moradores.quais_vicios IS 'Descrição dos vícios que o morador possui';
