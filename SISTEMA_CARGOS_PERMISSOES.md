# 🔐 Sistema de Cargos e Permissões

## 📋 Visão Geral

Sistema completo de controle de acesso baseado em cargos (RBAC - Role-Based Access Control) com rastreamento de autoria de registros.

---

## 👥 Cargos Disponíveis

### **1. Comandante** 🎖️
- **Permissões**: Acesso total
- **Pode**:
  - ✅ Criar novos cadastros
  - ✅ Editar qualquer cadastro
  - ✅ Excluir cadastros
  - ✅ Visualizar todos os dados
  - ✅ Gerenciar usuários
- **Uso**: Líder da equipe, máxima autoridade

### **2. Administrador** 👨‍💼
- **Permissões**: Acesso total administrativo
- **Pode**:
  - ✅ Criar novos cadastros
  - ✅ Editar qualquer cadastro
  - ✅ Excluir cadastros
  - ✅ Visualizar todos os dados
  - ✅ Gerenciar usuários
- **Uso**: Gestores e coordenadores

### **3. Desenvolvedor** 👨‍💻
- **Permissões**: Criar e editar
- **Pode**:
  - ✅ Criar novos cadastros
  - ✅ Editar cadastros
  - ✅ Visualizar todos os dados
  - ❌ Excluir cadastros
- **Uso**: Equipe técnica e operacional

### **4. Estagiário** 📚
- **Permissões**: Somente leitura (Read-Only)
- **Pode**:
  - ✅ Visualizar todos os dados
  - ❌ Criar cadastros
  - ❌ Editar cadastros
  - ❌ Excluir cadastros
- **Uso**: Estagiários e aprendizes

### **5. Visualizador** 👁️
- **Permissões**: Somente leitura (Read-Only)
- **Pode**:
  - ✅ Visualizar todos os dados
  - ❌ Criar cadastros
  - ❌ Editar cadastros
  - ❌ Excluir cadastros
- **Uso**: Auditores, consultores externos

---

## 🎯 Matriz de Permissões

| Cargo          | Criar | Editar | Excluir | Visualizar | Admin |
|----------------|-------|--------|---------|------------|-------|
| Comandante     | ✅    | ✅     | ✅      | ✅         | ✅    |
| Administrador  | ✅    | ✅     | ✅      | ✅         | ✅    |
| Desenvolvedor  | ✅    | ✅     | ❌      | ✅         | ❌    |
| Estagiário     | ❌    | ❌     | ❌      | ✅         | ❌    |
| Visualizador   | ❌    | ❌     | ❌      | ✅         | ❌    |

---

## 📊 Rastreamento de Autoria

### **Informações Registradas:**

Cada cadastro salva automaticamente:
- ✅ **ID do criador** - UUID do usuário
- ✅ **Nome do criador** - Email/nome do usuário
- ✅ **Data de criação** - Timestamp automático

### **Onde Aparece:**

```
┌─────────────────────────────────────┐
│ 👤 Registrado por: joao@email.com   │
│ 📅 Cadastrado em 28/10/2025 às 09:10│
└─────────────────────────────────────┘
```

---

## 🔧 Implementação Técnica

### **1. Banco de Dados**

#### **Enum de Cargos:**
```sql
CREATE TYPE cargo_usuario AS ENUM (
  'comandante',
  'administrador',
  'desenvolvedor',
  'estagiario',
  'visualizador'
);
```

#### **Tabela Profiles:**
```sql
ALTER TABLE profiles 
ADD COLUMN cargo cargo_usuario DEFAULT 'visualizador';
```

#### **Tabela Moradores:**
```sql
ALTER TABLE moradores 
ADD COLUMN criado_por_id UUID REFERENCES auth.users(id),
ADD COLUMN criado_por_nome TEXT;
```

### **2. Frontend (React/TypeScript)**

#### **Hook de Permissões:**
```typescript
const { permissions, loading, userEmail, userId } = usePermissions();

// Verificar permissões
if (permissions?.canCreate) {
  // Mostrar botão de criar
}

if (permissions?.isReadOnly) {
  // Desabilitar edição
}
```

#### **Exemplo de Uso:**
```tsx
<Button 
  disabled={permissions?.isReadOnly}
  onClick={handleCreate}
>
  Novo Cadastro
</Button>
```

---

## 🚀 Como Usar

### **1. Atribuir Cargo a um Usuário**

#### **Via Supabase Dashboard:**
1. Acesse: https://supabase.com/dashboard
2. Vá em **Table Editor** → **profiles**
3. Encontre o usuário
4. Edite o campo **cargo**
5. Escolha: `comandante`, `administrador`, `desenvolvedor`, `estagiario` ou `visualizador`
6. Salve

#### **Via SQL:**
```sql
-- Definir usuário como Comandante
UPDATE profiles 
SET cargo = 'comandante' 
WHERE id = 'UUID_DO_USUARIO';

-- Definir usuário como Estagiário (read-only)
UPDATE profiles 
SET cargo = 'estagiario' 
WHERE id = 'UUID_DO_USUARIO';
```

### **2. Criar Novo Usuário com Cargo**

```sql
-- Após criar usuário no Authentication
UPDATE profiles 
SET cargo = 'desenvolvedor' 
WHERE id = 'UUID_DO_NOVO_USUARIO';
```

---

## 🎨 Interface do Usuário

### **Usuário com Permissões Completas:**
```
┌────────────────────────────────────┐
│ [+ Novo Cadastro]  [Editar]  [🗑️]  │
│                                    │
│ Lista de Cadastros                 │
│ ✅ Todos os botões habilitados     │
└────────────────────────────────────┘
```

### **Usuário Read-Only (Estagiário/Visualizador):**
```
┌────────────────────────────────────┐
│ 👁️ Modo Visualização               │
│                                    │
│ Lista de Cadastros                 │
│ ⚠️ Botões de ação desabilitados    │
└────────────────────────────────────┘
```

---

## 📝 Exemplos de Casos de Uso

### **Caso 1: Comandante cria cadastro**
```
1. Comandante faz login
2. Clica em "Novo Cadastro"
3. Preenche formulário
4. Salva
5. Sistema registra:
   - criado_por_id: UUID do comandante
   - criado_por_nome: email do comandante
   - data_criacao: timestamp atual
```

### **Caso 2: Estagiário tenta criar cadastro**
```
1. Estagiário faz login
2. Botão "Novo Cadastro" está DESABILITADO
3. Pode apenas visualizar cadastros existentes
4. Vê quem criou cada registro
```

### **Caso 3: Desenvolvedor edita cadastro**
```
1. Desenvolvedor faz login
2. Pode criar e editar cadastros
3. NÃO pode excluir
4. Botão de exclusão está OCULTO/DESABILITADO
```

---

## 🔒 Segurança

### **Níveis de Proteção:**

1. **Frontend**: Botões desabilitados/ocultos
2. **Backend**: RLS Policies no Supabase
3. **Banco**: Constraints e validações

### **RLS Policies Recomendadas:**

```sql
-- Permitir leitura para todos autenticados
CREATE POLICY "Todos podem visualizar"
ON moradores FOR SELECT
TO authenticated
USING (true);

-- Permitir criação apenas para cargos específicos
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

-- Permitir edição apenas para cargos específicos
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

## 📊 Relatórios e Auditoria

### **Consultar quem criou cada registro:**

```sql
SELECT 
  nome_completo,
  criado_por_nome as criador,
  created_at as data_criacao
FROM moradores
ORDER BY created_at DESC;
```

### **Estatísticas por criador:**

```sql
SELECT 
  criado_por_nome as criador,
  COUNT(*) as total_cadastros
FROM moradores
GROUP BY criado_por_nome
ORDER BY total_cadastros DESC;
```

### **Listar usuários por cargo:**

```sql
SELECT 
  email,
  cargo,
  created_at
FROM profiles
JOIN auth.users ON profiles.id = auth.users.id
ORDER BY cargo, email;
```

---

## 🧪 Testando o Sistema

### **Teste 1: Criar usuário com cargo**
```
1. Crie usuário no Supabase Authentication
2. Defina cargo na tabela profiles
3. Faça login com esse usuário
4. Verifique se as permissões estão corretas
```

### **Teste 2: Usuário Read-Only**
```
1. Crie usuário com cargo 'estagiario'
2. Faça login
3. Verifique que:
   - Botão "Novo Cadastro" está desabilitado
   - Botões de edição estão desabilitados
   - Pode visualizar todos os dados
```

### **Teste 3: Rastreamento de autoria**
```
1. Faça login como Comandante
2. Crie um novo cadastro
3. Visualize o cadastro
4. Verifique se aparece "Registrado por: [seu email]"
```

---

## 📋 Checklist de Implementação

### **Backend (Supabase):**
- [ ] Executar migração SQL
- [ ] Criar enum de cargos
- [ ] Adicionar campo cargo em profiles
- [ ] Adicionar campos de rastreamento em moradores
- [ ] Criar RLS policies
- [ ] Testar permissões no SQL Editor

### **Frontend (React):**
- [ ] Criar hook usePermissions
- [ ] Criar componente CriadorInfo
- [ ] Atualizar NovoCadastro.tsx
- [ ] Atualizar listagem de cadastros
- [ ] Adicionar badges de cargo
- [ ] Desabilitar botões para read-only
- [ ] Mostrar informações do criador

### **Testes:**
- [ ] Testar cada cargo
- [ ] Verificar permissões
- [ ] Testar rastreamento
- [ ] Validar segurança

---

## 🚀 Próximos Passos

1. **Execute a migração SQL** no Supabase
2. **Defina cargos** para usuários existentes
3. **Teste o sistema** com diferentes cargos
4. **Ajuste permissões** conforme necessário

---

## 📞 Suporte

**Dúvidas sobre cargos:**
- Comandante: Acesso total
- Estagiário: Apenas visualização

**Problemas comuns:**
- Usuário não tem permissão: Verifique cargo na tabela profiles
- Botões não aparecem: Limpe cache do navegador
- Erro ao salvar: Verifique RLS policies

---

**Sistema de Cargos e Permissões pronto para implementação!** 🎉
