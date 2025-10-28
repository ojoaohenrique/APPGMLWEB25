-- Sistema de Cargos e Permissões
-- Migração para adicionar controle de acesso baseado em cargos

-- 1. Criar ENUM para cargos
CREATE TYPE public.cargo_usuario AS ENUM (
  'comandante',
  'administrador',
  'desenvolvedor',
  'estagiario',
  'visualizador'
);

-- 2. Adicionar campo de cargo na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS cargo public.cargo_usuario DEFAULT 'visualizador';

-- 3. Adicionar campo para rastrear quem criou cada registro
ALTER TABLE public.moradores 
ADD COLUMN IF NOT EXISTS criado_por_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS criado_por_nome TEXT;

-- 4. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_profiles_cargo ON public.profiles(cargo);
CREATE INDEX IF NOT EXISTS idx_moradores_criado_por ON public.moradores(criado_por_id);

-- 5. Atualizar registros existentes com o usuário atual (se houver)
-- Isso vai pegar o user_id existente e definir como criador
UPDATE public.moradores 
SET criado_por_id = user_id 
WHERE criado_por_id IS NULL AND user_id IS NOT NULL;

-- 6. Criar função para obter nome do usuário criador
CREATE OR REPLACE FUNCTION public.get_criador_nome(user_id UUID)
RETURNS TEXT AS $$
  SELECT email FROM auth.users WHERE id = user_id;
$$ LANGUAGE SQL STABLE;

-- 7. Atualizar nomes dos criadores nos registros existentes
UPDATE public.moradores 
SET criado_por_nome = public.get_criador_nome(criado_por_id)
WHERE criado_por_id IS NOT NULL AND criado_por_nome IS NULL;

-- 8. Comentários para documentação
COMMENT ON TYPE public.cargo_usuario IS 'Cargos disponíveis no sistema com diferentes níveis de permissão';
COMMENT ON COLUMN public.profiles.cargo IS 'Cargo do usuário que define suas permissões no sistema';
COMMENT ON COLUMN public.moradores.criado_por_id IS 'ID do usuário que criou este registro';
COMMENT ON COLUMN public.moradores.criado_por_nome IS 'Nome/email do usuário que criou este registro';

-- 9. Criar view para facilitar consultas com informações do criador
CREATE OR REPLACE VIEW public.moradores_com_criador AS
SELECT 
  m.*,
  p.cargo as cargo_criador,
  COALESCE(m.criado_por_nome, u.email, 'Sistema') as nome_criador
FROM public.moradores m
LEFT JOIN auth.users u ON m.criado_por_id = u.id
LEFT JOIN public.profiles p ON m.criado_por_id = p.id;

-- 10. Garantir que novos usuários tenham cargo definido
-- Atualizar trigger existente ou criar novo
CREATE OR REPLACE FUNCTION public.handle_new_user_with_cargo()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, cargo)
  VALUES (NEW.id, 'visualizador')
  ON CONFLICT (id) DO UPDATE SET cargo = COALESCE(profiles.cargo, 'visualizador');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger se não existir
DROP TRIGGER IF EXISTS on_auth_user_created_set_cargo ON auth.users;
CREATE TRIGGER on_auth_user_created_set_cargo
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_with_cargo();
