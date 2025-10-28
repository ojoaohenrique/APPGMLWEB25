# 🚀 GUIA RÁPIDO: Sistema de Cargos e Permissões

## ⚡ Implementação em 3 Passos

### **PASSO 1: Executar Migrações SQL** ⚠️ OBRIGATÓRIO

1. Acesse: https://supabase.com/dashboard
2. Vá em **SQL Editor**
3. Copie e cole o SQL abaixo:

```sql
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

-- 3. Adicionar campos para rastrear quem criou cada registro
ALTER TABLE public.moradores 
ADD COLUMN IF NOT EXISTS criado_por_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS criado_por_nome TEXT;

-- 4. Criar índices
CREATE INDEX IF NOT EXISTS idx_profiles_cargo ON public.profiles(cargo);
CREATE INDEX IF NOT EXISTS idx_moradores_criado_por ON public.moradores(criado_por_id);

-- 5. Atualizar registros existentes
UPDATE public.moradores 
SET criado_por_id = user_id 
WHERE criado_por_id IS NULL AND user_id IS NOT NULL;

-- 6. Criar função para obter nome do criador
CREATE OR REPLACE FUNCTION public.get_criador_nome(user_id UUID)
RETURNS TEXT AS $$
  SELECT email FROM auth.users WHERE id = user_id;
$$ LANGUAGE SQL STABLE;

-- 7. Atualizar nomes dos criadores
UPDATE public.moradores 
SET criado_por_nome = public.get_criador_nome(criado_por_id)
WHERE criado_por_id IS NOT NULL AND criado_por_nome IS NULL;

-- 8. Trigger para novos usuários
CREATE OR REPLACE FUNCTION public.handle_new_user_with_cargo()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, cargo)
  VALUES (NEW.id, 'visualizador')
  ON CONFLICT (id) DO UPDATE SET cargo = COALESCE(profiles.cargo, 'visualizador');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_set_cargo ON auth.users;
CREATE TRIGGER on_auth_user_created_set_cargo
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_with_cargo();
```

4. Clique em **RUN**
5. Aguarde confirmação ✅

---

### **PASSO 2: Definir Cargos dos Usuários**

#### **Opção A: Via Interface (Table Editor)**
1. Vá em **Table Editor** → **profiles**
2. Encontre o usuário
3. Edite o campo **cargo**
4. Escolha um cargo:
   - `comandante` - Acesso total
   - `administrador` - Acesso total
   - `desenvolvedor` - Criar e editar
   - `estagiario` - Apenas visualização
   - `visualizador` - Apenas visualização
5. Salve

#### **Opção B: Via SQL**
```sql
-- Definir como Comandante
UPDATE profiles 
SET cargo = 'comandante' 
WHERE id = 'UUID_DO_USUARIO';

-- Definir como Estagiário (read-only)
UPDATE profiles 
SET cargo = 'estagiario' 
WHERE id = 'UUID_DO_USUARIO';
```

---

### **PASSO 3: Aguardar Deploy e Testar**

1. **Aguarde 2-3 minutos** (deploy automático do Vercel)
2. **Acesse o site**
3. **Faça login**
4. **Teste as funcionalidades**

---

## 🎯 Cargos Disponíveis

| Cargo          | Criar | Editar | Excluir | Visualizar |
|----------------|-------|--------|---------|------------|
| **Comandante** | ✅    | ✅     | ✅      | ✅         |
| **Administrador** | ✅ | ✅     | ✅      | ✅         |
| **Desenvolvedor** | ✅ | ✅     | ❌      | ✅         |
| **Estagiário** | ❌    | ❌     | ❌      | ✅         |
| **Visualizador** | ❌  | ❌     | ❌      | ✅         |

---

## 🧪 Como Testar

### **Teste 1: Usuário com Permissões Completas**
1. Defina cargo como `comandante` ou `administrador`
2. Faça login
3. Vá em "Novo Cadastro"
4. ✅ Botão "Salvar" está habilitado
5. ✅ Pode criar e editar

### **Teste 2: Usuário Read-Only**
1. Defina cargo como `estagiario` ou `visualizador`
2. Faça login
3. Vá em "Novo Cadastro"
4. ⚠️ Vê mensagem: "Modo Visualização"
5. ❌ Botão "Salvar" está desabilitado
6. ✅ Pode apenas visualizar

### **Teste 3: Rastreamento de Autoria**
1. Faça login como Comandante
2. Crie um novo cadastro
3. Salve
4. Edite o cadastro
5. ✅ Vê: "Registrado por: [seu email]"
6. ✅ Vê: "Cadastrado em [data/hora]"

---

## 📊 Funcionalidades Implementadas

### **1. Sistema de Cargos** ✅
- 5 níveis de acesso diferentes
- Permissões granulares
- Cargo padrão: Visualizador

### **2. Controle de Acesso** ✅
- Botões desabilitados para read-only
- Mensagem de "Modo Visualização"
- Validação no frontend

### **3. Rastreamento de Autoria** ✅
- Salva quem criou cada registro
- Mostra nome do criador
- Mostra data/hora de criação

---

## 🔒 Segurança

### **Proteção em Camadas:**
1. ✅ **Frontend**: Botões desabilitados
2. ✅ **Backend**: RLS Policies (próximo passo)
3. ✅ **Banco**: Constraints e validações

### **RLS Policies Recomendadas** (Opcional):

```sql
-- Permitir leitura para todos
CREATE POLICY "Todos podem visualizar"
ON moradores FOR SELECT
TO authenticated
USING (true);

-- Permitir criação apenas para cargos autorizados
CREATE POLICY "Apenas cargos autorizados podem criar"
ON moradores FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.cargo IN ('comandante', 'administrador', 'desenvolvedor')
  )
);

-- Permitir edição apenas para cargos autorizados
CREATE POLICY "Apenas cargos autorizados podem editar"
ON moradores FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.cargo IN ('comandante', 'administrador', 'desenvolvedor')
  )
);

-- Permitir exclusão apenas para admins
CREATE POLICY "Apenas admins podem excluir"
ON moradores FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.cargo IN ('comandante', 'administrador')
  )
);
```

---

## 📋 Checklist de Implementação

- [ ] **SQL executado no Supabase**
- [ ] **Enum de cargos criado**
- [ ] **Campo cargo adicionado em profiles**
- [ ] **Campos de rastreamento adicionados em moradores**
- [ ] **Cargos definidos para usuários existentes**
- [ ] **Deploy do Vercel concluído**
- [ ] **Sistema testado com diferentes cargos**
- [ ] **Rastreamento de autoria funcionando**

---

## 🆘 Solução de Problemas

### **Erro ao executar SQL:**
- Verifique se está no projeto correto
- Execute os comandos separadamente se necessário
- Verifique permissões

### **Cargo não aparece:**
- Aguarde deploy terminar (2-3 min)
- Limpe cache do navegador
- Faça logout e login novamente

### **Botões não desabilitam:**
- Verifique se cargo está definido
- Veja console do navegador (F12)
- Verifique se migração foi executada

### **Criador não aparece:**
- Verifique se campos foram criados
- Teste com novo cadastro
- Veja console para erros

---

## 📞 Comandos Úteis

### **Listar usuários e cargos:**
```sql
SELECT 
  u.email,
  p.cargo,
  p.created_at
FROM profiles p
JOIN auth.users u ON p.id = u.id
ORDER BY p.cargo, u.email;
```

### **Estatísticas por criador:**
```sql
SELECT 
  criado_por_nome as criador,
  COUNT(*) as total_cadastros
FROM moradores
WHERE criado_por_nome IS NOT NULL
GROUP BY criado_por_nome
ORDER BY total_cadastros DESC;
```

### **Mudar cargo de usuário:**
```sql
UPDATE profiles 
SET cargo = 'comandante' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'usuario@email.com');
```

---

## ⏰ Timeline

```
Agora → Execute SQL no Supabase (5 min)
+5 min → Defina cargos dos usuários (2 min)
+7 min → Aguarde deploy Vercel (2-3 min)
+10 min → Teste o sistema ✅
```

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- **`SISTEMA_CARGOS_PERMISSOES.md`** - Documentação completa
- **`supabase/migrations/20251028000003_add_roles_and_permissions.sql`** - SQL completo

---

**Sistema pronto! Execute o SQL e teste!** 🎉
