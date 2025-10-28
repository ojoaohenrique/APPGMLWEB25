# 🔄 ATUALIZAÇÃO COMPLETA DO PROJETO

## ⚠️ PROBLEMAS IDENTIFICADOS

1. ❌ Tabela `moradores` não encontrada no banco
2. ❌ Bucket `morador-fotos` não existe no storage
3. ❌ Tabela `morador_fotos` não criada
4. ❌ Migrações não foram executadas

---

## ✅ SOLUÇÃO COMPLETA (Passo a Passo)

### PASSO 1: Executar Todas as Migrações do Banco

1. **Acesse o Supabase Dashboard**
   ```
   https://supabase.com/dashboard
   ```

2. **Selecione seu projeto**: `xzkdzjibhdachyinhlrb`

3. **Vá em SQL Editor** (menu lateral)

4. **Execute CADA migração abaixo NA ORDEM:**

---

#### Migração 1: Criar Estrutura Principal

Cole e execute este SQL:

```sql
-- Criar tabela de perfis de usuários (guardas municipais)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_completo TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies para profiles
DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON public.profiles;
CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON public.profiles;
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

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Criar enum para sexo
DO $$ BEGIN
  CREATE TYPE public.sexo_type AS ENUM ('masculino', 'feminino', 'outro');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Criar tabela principal de moradores
CREATE TABLE IF NOT EXISTS public.moradores (
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
  quais_vicios TEXT,
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

-- Policies para moradores
DROP POLICY IF EXISTS "Usuários podem ver todos os moradores" ON public.moradores;
CREATE POLICY "Usuários podem ver todos os moradores"
  ON public.moradores FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Usuários podem criar moradores" ON public.moradores;
CREATE POLICY "Usuários podem criar moradores"
  ON public.moradores FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem atualizar moradores que criaram" ON public.moradores;
CREATE POLICY "Usuários podem atualizar moradores que criaram"
  ON public.moradores FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem deletar moradores que criaram" ON public.moradores;
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

DROP TRIGGER IF EXISTS update_moradores_updated_at ON public.moradores;
CREATE TRIGGER update_moradores_updated_at
  BEFORE UPDATE ON public.moradores
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_moradores_user_id ON public.moradores(user_id);
CREATE INDEX IF NOT EXISTS idx_moradores_nome ON public.moradores(nome_completo);
CREATE INDEX IF NOT EXISTS idx_moradores_local ON public.moradores(local_abordagem);
CREATE INDEX IF NOT EXISTS idx_moradores_cidade_natal ON public.moradores(cidade_natal);
CREATE INDEX IF NOT EXISTS idx_moradores_created_at ON public.moradores(created_at DESC);
```

**Aguarde a execução completar.** ✅

---

#### Migração 2: Criar Tabela de Fotos Adicionais

Cole e execute este SQL:

```sql
-- Criar tabela para fotos adicionais dos moradores
CREATE TABLE IF NOT EXISTS public.morador_fotos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  morador_id UUID REFERENCES public.moradores(id) ON DELETE CASCADE NOT NULL,
  foto_url TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.morador_fotos ENABLE ROW LEVEL SECURITY;

-- Policies para fotos adicionais
DROP POLICY IF EXISTS "Usuários podem ver fotos de todos os moradores" ON public.morador_fotos;
CREATE POLICY "Usuários podem ver fotos de todos os moradores"
  ON public.morador_fotos FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Usuários podem adicionar fotos aos moradores" ON public.morador_fotos;
CREATE POLICY "Usuários podem adicionar fotos aos moradores"
  ON public.morador_fotos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.moradores
      WHERE id = morador_id AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Usuários podem atualizar fotos dos moradores que criaram" ON public.morador_fotos;
CREATE POLICY "Usuários podem atualizar fotos dos moradores que criaram"
  ON public.morador_fotos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.moradores
      WHERE id = morador_id AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Usuários podem deletar fotos dos moradores que criaram" ON public.morador_fotos;
CREATE POLICY "Usuários podem deletar fotos dos moradores que criaram"
  ON public.morador_fotos FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.moradores
      WHERE id = morador_id AND user_id = auth.uid()
    )
  );

-- Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_morador_fotos_updated_at ON public.morador_fotos;
CREATE TRIGGER update_morador_fotos_updated_at
  BEFORE UPDATE ON public.morador_fotos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_morador_fotos_morador_id ON public.morador_fotos(morador_id);
CREATE INDEX IF NOT EXISTS idx_morador_fotos_ordem ON public.morador_fotos(morador_id, ordem);
```

**Aguarde a execução completar.** ✅

---

### PASSO 2: Criar Bucket de Storage

1. **Ainda no Supabase Dashboard**
2. **Vá em Storage** (menu lateral)
3. **Clique em "New bucket"**
4. **Preencha**:
   - **Name**: `morador-fotos`
   - **Public bucket**: ✅ **MARQUE**
   - **File size limit**: 5 MB
5. **Clique em "Create bucket"**

---

### PASSO 3: Configurar Policies do Storage

1. **Vá em SQL Editor** novamente
2. **Execute este SQL**:

```sql
-- Policies para o bucket de fotos
DROP POLICY IF EXISTS "Fotos são publicamente acessíveis" ON storage.objects;
CREATE POLICY "Fotos são publicamente acessíveis"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'morador-fotos');

DROP POLICY IF EXISTS "Usuários autenticados podem fazer upload de fotos" ON storage.objects;
CREATE POLICY "Usuários autenticados podem fazer upload de fotos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'morador-fotos');

DROP POLICY IF EXISTS "Usuários autenticados podem atualizar suas fotos" ON storage.objects;
CREATE POLICY "Usuários autenticados podem atualizar suas fotos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'morador-fotos');

DROP POLICY IF EXISTS "Usuários autenticados podem deletar suas fotos" ON storage.objects;
CREATE POLICY "Usuários autenticados podem deletar suas fotos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'morador-fotos');
```

---

### PASSO 4: Criar Primeiro Usuário

1. **Vá em Authentication → Users**
2. **Clique em "Add user"**
3. **Preencha**:
   - **Email**: seu email
   - **Password**: sua senha (mínimo 6 caracteres)
   - ✅ **Marque**: "Auto Confirm User"
4. **Clique em "Create user"**

---

### PASSO 5: Verificar Instalação

Execute estas verificações:

#### No Supabase Dashboard:

1. **Table Editor**:
   - [ ] Tabela `profiles` existe
   - [ ] Tabela `moradores` existe
   - [ ] Tabela `morador_fotos` existe

2. **Storage**:
   - [ ] Bucket `morador-fotos` existe
   - [ ] Bucket está marcado como Public

3. **Authentication → Users**:
   - [ ] Pelo menos 1 usuário criado

---

### PASSO 6: Testar o Sistema

1. **Abra o sistema**: http://localhost:8080
2. **Faça login** com o usuário criado
3. **Vá em "Novo Cadastro"**
4. **Preencha os campos**:
   - Nome completo
   - Local da abordagem
5. **Adicione uma foto**
6. **Clique em "Salvar Cadastro"**

**Deve salvar sem erros!** ✅

---

## 📋 Checklist Final

Marque cada item após completar:

- [ ] Migração 1 executada (tabelas principais)
- [ ] Migração 2 executada (fotos adicionais)
- [ ] Bucket `morador-fotos` criado
- [ ] Policies do storage configuradas
- [ ] Primeiro usuário criado
- [ ] Login funcionando
- [ ] Cadastro salvando com sucesso
- [ ] Fotos sendo enviadas

---

## 🆘 Se Algo Der Errado

### Erro: "relation already exists"
- **Solução**: Ignore, significa que a tabela já existe

### Erro: "bucket already exists"
- **Solução**: Ignore, o bucket já foi criado

### Erro: "policy already exists"
- **Solução**: Ignore, a policy já existe

### Erro ao fazer login:
- Verifique se o usuário foi criado
- Verifique se marcou "Auto Confirm User"
- Tente resetar a senha

### Cadastro não salva:
1. Abra o console (F12)
2. Vá na aba "Console"
3. Copie os erros em vermelho
4. Me envie para análise

---

## 🎯 Resultado Esperado

Após seguir todos os passos:

✅ Sistema funcionando 100%
✅ Login funcionando
✅ Cadastros salvando
✅ Fotos sendo enviadas
✅ Banco de dados completo
✅ Storage configurado

---

**Execute cada passo com calma e na ordem!** 🚀
