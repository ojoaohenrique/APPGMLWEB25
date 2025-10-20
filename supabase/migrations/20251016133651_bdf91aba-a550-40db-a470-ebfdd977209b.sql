-- Criar tabela de perfis de usuários (guardas municipais)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_completo TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger para criar perfil automaticamente ao criar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome_completo)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'nome_completo', 'Guarda Municipal')
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Criar enum para sexo
CREATE TYPE public.sexo_type AS ENUM ('masculino', 'feminino', 'outro');

-- Criar tabela principal de moradores
CREATE TABLE public.moradores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Informações pessoais
  nome_completo TEXT NOT NULL,
  cpf TEXT,
  data_nascimento DATE,
  nome_mae TEXT,
  sexo sexo_type,
  cidade_natal TEXT,
  profissao TEXT,
  
  -- Situação social
  recebe_auxilio BOOLEAN DEFAULT false,
  qual_auxilio TEXT,
  tempo_situacao_rua TEXT,
  tempo_em_laguna TEXT,
  tempo_pretende_ficar TEXT,
  procurou_assistencia_social BOOLEAN DEFAULT false,
  qual_servico_procurou TEXT,
  
  -- Localização da abordagem
  local_abordagem TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Informações adicionais
  possui_vicios BOOLEAN DEFAULT false,
  passagens_policia BOOLEAN DEFAULT false,
  observacoes_passagens TEXT,
  
  -- Foto
  foto_url TEXT,
  
  -- Observações gerais
  observacoes TEXT,
  
  -- Status de sincronização
  status_sincronizacao TEXT DEFAULT 'enviado' CHECK (status_sincronizacao IN ('offline', 'enviado')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.moradores ENABLE ROW LEVEL SECURITY;

-- Policies para moradores - usuários autenticados podem fazer tudo
CREATE POLICY "Usuários podem ver todos os moradores"
  ON public.moradores FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar moradores"
  ON public.moradores FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar moradores que criaram"
  ON public.moradores FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar moradores que criaram"
  ON public.moradores FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_moradores_updated_at
  BEFORE UPDATE ON public.moradores
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Criar bucket de storage para fotos dos moradores
INSERT INTO storage.buckets (id, name, public)
VALUES ('morador-fotos', 'morador-fotos', true);

-- Policies para o bucket de fotos
CREATE POLICY "Fotos são publicamente acessíveis"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'morador-fotos');

CREATE POLICY "Usuários autenticados podem fazer upload de fotos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'morador-fotos');

CREATE POLICY "Usuários autenticados podem atualizar suas fotos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'morador-fotos');

CREATE POLICY "Usuários autenticados podem deletar suas fotos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'morador-fotos');

-- Criar índices para melhor performance
CREATE INDEX idx_moradores_user_id ON public.moradores(user_id);
CREATE INDEX idx_moradores_nome ON public.moradores(nome_completo);
CREATE INDEX idx_moradores_local ON public.moradores(local_abordagem);
CREATE INDEX idx_moradores_cidade_natal ON public.moradores(cidade_natal);
CREATE INDEX idx_moradores_created_at ON public.moradores(created_at DESC);