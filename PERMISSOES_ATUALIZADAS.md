# 🔐 Sistema de Permissões - Atualizado

## 📋 **Matriz Completa de Permissões**

| Cargo | Visualizar | Criar | Editar | Excluir | Admin | Descrição |
|-------|------------|-------|--------|---------|-------|-----------|
| **Comandante** | ✅ | ✅ | ✅ | ✅ | ✅ | Acesso total ao sistema |
| **Administrador** | ✅ | ✅ | ✅ | ✅ | ✅ | Acesso total administrativo |
| **Desenvolvedor** | ✅ | ✅ | ✅ | ✅ | ❌ | Pode criar, editar e excluir |
| **Guarda** | ✅ | ✅ | ✅ | ❌ | ❌ | Pode criar e editar, mas não excluir |
| **Estagiário** | ✅ | ❌ | ❌ | ❌ | ❌ | Apenas visualização (read-only) |
| **Visualizador** | ✅ | ❌ | ❌ | ❌ | ❌ | Apenas visualização (read-only) |

---

## 🎯 **Regras Específicas**

### **1. Exclusão Restrita**
A ação de **excluir** um cadastrado é uma permissão especial:
- ✅ **Comandante**: Pode excluir
- ✅ **Administrador**: Pode excluir
- ✅ **Desenvolvedor**: Pode excluir
- ❌ **Guarda**: NÃO pode excluir (botão oculto)
- ❌ **Estagiário**: NÃO pode excluir (botão oculto)
- ❌ **Visualizador**: NÃO pode excluir (botão oculto)

### **2. Criação e Edição**
- ✅ **Comandante, Administrador, Desenvolvedor, Guarda**: Podem criar e editar
- ❌ **Estagiário, Visualizador**: Apenas visualizam (botões desabilitados)

### **3. Rastreamento de Autoria**
- ✅ Todos os registros salvam automaticamente:
  - `criado_por_id`: UUID do usuário
  - `criado_por_nome`: Email do usuário
  - `created_at`: Data/hora de criação
- ✅ Interface mostra: **"Registrado por: [Nome do Usuário]"**

---

## 🎨 **Interface por Cargo**

### **Comandante/Administrador/Desenvolvedor:**
```
┌────────────────────────────────────┐
│ [+ Novo Cadastro]                  │
│                                    │
│ Lista de Cadastrados:              │
│ [👁️ Ver] [✏️ Editar] [🗑️ Excluir] │
└────────────────────────────────────┘
```

### **Guarda:**
```
┌────────────────────────────────────┐
│ [+ Novo Cadastro]                  │
│                                    │
│ Lista de Cadastrados:              │
│ [👁️ Ver] [✏️ Editar]               │
│ ⚠️ Botão Excluir OCULTO            │
└────────────────────────────────────┘
```

### **Estagiário/Visualizador:**
```
┌────────────────────────────────────┐
│ 👁️ Modo Visualização               │
│ ⚠️ Você não tem permissão para     │
│    criar ou editar                 │
│                                    │
│ Lista de Cadastrados:              │
│ [👁️ Ver]                           │
│ ⚠️ Botões Editar e Excluir OCULTOS │
└────────────────────────────────────┘
```

---

## 💻 **Implementação Técnica**

### **Hook de Permissões:**
```typescript
const { permissions } = usePermissions();

// Verificar se pode excluir
if (permissions?.canDelete) {
  // Mostrar botão de excluir
}

// Verificar se é read-only
if (permissions?.isReadOnly) {
  // Desabilitar todos os botões de ação
}
```

### **Exemplo de Uso:**
```tsx
{/* Botão Excluir - Apenas para quem tem permissão */}
{permissions?.canDelete && (
  <Button variant="destructive" onClick={handleDelete}>
    <Trash2 className="h-4 w-4" />
    Excluir
  </Button>
)}

{/* Botão Editar - Apenas para quem não é read-only */}
{!permissions?.isReadOnly && (
  <Button variant="outline" onClick={handleEdit}>
    <Edit className="h-4 w-4" />
    Editar
  </Button>
)}
```

---

## 🗄️ **Banco de Dados**

### **ENUM Atualizado:**
```sql
CREATE TYPE cargo_usuario AS ENUM (
  'comandante',
  'administrador',
  'desenvolvedor',
  'guarda',        -- NOVO!
  'estagiario',
  'visualizador'
);
```

### **Adicionar Cargo "Guarda":**
```sql
-- Se o ENUM já existe, adicionar novo valor
ALTER TYPE public.cargo_usuario ADD VALUE IF NOT EXISTS 'guarda';
```

### **Definir Usuário como Guarda:**
```sql
UPDATE profiles 
SET cargo = 'guarda'
WHERE id = (SELECT id FROM auth.users WHERE email = 'usuario@email.com');
```

---

## 📊 **Casos de Uso**

### **Caso 1: Guarda em Serviço**
```
Cargo: Guarda
Pode:
  ✅ Visualizar todos os cadastrados
  ✅ Criar novos cadastros
  ✅ Editar cadastros existentes
  ❌ Excluir cadastros (botão oculto)
```

### **Caso 2: Estagiário Aprendendo**
```
Cargo: Estagiário
Pode:
  ✅ Visualizar todos os cadastrados
  ❌ Criar novos cadastros (botão desabilitado)
  ❌ Editar cadastros (botão oculto)
  ❌ Excluir cadastros (botão oculto)
Vê: "👁️ Modo Visualização"
```

### **Caso 3: Desenvolvedor/Comandante**
```
Cargo: Desenvolvedor ou Comandante
Pode:
  ✅ Visualizar todos os cadastrados
  ✅ Criar novos cadastros
  ✅ Editar cadastros existentes
  ✅ Excluir cadastros
Acesso Total!
```

---

## 🔧 **Como Atribuir Cargos**

### **Via Supabase Dashboard:**
1. Acesse: https://supabase.com/dashboard
2. Vá em **Table Editor** → **profiles**
3. Encontre o usuário
4. Edite o campo **cargo**
5. Escolha: `comandante`, `administrador`, `desenvolvedor`, `guarda`, `estagiario` ou `visualizador`
6. Salve

### **Via SQL:**
```sql
-- Definir como Guarda
UPDATE profiles 
SET cargo = 'guarda' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'guarda@email.com');

-- Definir como Desenvolvedor
UPDATE profiles 
SET cargo = 'desenvolvedor' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'dev@email.com');
```

---

## 📝 **Rastreamento de Autoria**

### **Informações Salvas:**
```typescript
{
  criado_por_id: "uuid-do-usuario",
  criado_por_nome: "usuario@email.com",
  created_at: "2025-10-28T15:30:00Z"
}
```

### **Exibição na Interface:**
```
┌────────────────────────────────────┐
│ Detalhes do Cadastro               │
│                                    │
│ 👤 Registrado por: joao@email.com  │
│ 📅 Cadastrado em 28/10/2025 15:30  │
└────────────────────────────────────┘
```

---

## ✅ **Checklist de Implementação**

- [x] Criar enum com 6 cargos
- [x] Adicionar campo cargo em profiles
- [x] Adicionar campos de rastreamento em moradores
- [x] Criar hook usePermissions
- [x] Implementar controle de botões
- [x] Adicionar cargo "Guarda"
- [x] Ajustar permissões do Desenvolvedor
- [x] Mostrar informações do criador
- [x] Desabilitar botões para read-only
- [x] Ocultar botão excluir para Guarda

---

## 🚀 **Migração SQL Necessária**

Execute no Supabase SQL Editor:

```sql
-- Adicionar cargo "Guarda" ao ENUM
ALTER TYPE public.cargo_usuario ADD VALUE IF NOT EXISTS 'guarda';
```

---

**Sistema de Permissões Completo e Atualizado!** 🎉
