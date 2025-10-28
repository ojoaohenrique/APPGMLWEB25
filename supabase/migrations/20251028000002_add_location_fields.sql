-- Adicionar novos campos de localização e remover latitude/longitude
-- Migração para melhorar detalhamento da localização

-- Adicionar novos campos
ALTER TABLE public.moradores 
ADD COLUMN IF NOT EXISTS bairro TEXT,
ADD COLUMN IF NOT EXISTS rua TEXT,
ADD COLUMN IF NOT EXISTS informacoes_local TEXT;

-- Remover campos antigos (latitude e longitude)
ALTER TABLE public.moradores 
DROP COLUMN IF EXISTS latitude,
DROP COLUMN IF EXISTS longitude;

-- Comentários para documentação
COMMENT ON COLUMN public.moradores.bairro IS 'Bairro onde ocorreu a abordagem';
COMMENT ON COLUMN public.moradores.rua IS 'Rua ou avenida da abordagem';
COMMENT ON COLUMN public.moradores.informacoes_local IS 'Informações detalhadas sobre o local, pontos de referência, condições do ambiente';
