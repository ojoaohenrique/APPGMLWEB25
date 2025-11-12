# 🔐 MANUAL DE CARGOS E PERMISSÕES
## Sistema de Gestão de Moradores em Situação de Rua
### Guarda Municipal de Laguna - SC

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Cargos Disponíveis](#cargos-disponíveis)
3. [Matriz de Permissões](#matriz-de-permissões)
4. [Descrição Detalhada dos Cargos](#descrição-detalhada-dos-cargos)
5. [Como Atribuir Cargos](#como-atribuir-cargos)
6. [Rastreamento de Autoria](#rastreamento-de-autoria)
7. [Casos de Uso](#casos-de-uso)
8. [Perguntas Frequentes](#perguntas-frequentes)

---

## 📖 VISÃO GERAL

O sistema de cargos e permissões foi implementado para garantir a segurança e o controle adequado das informações sobre moradores em situação de rua. Cada usuário do sistema possui um cargo que define suas permissões de acesso.

### Princípios do Sistema:
- **Segurança**: Apenas usuários autorizados podem realizar ações críticas
- **Rastreabilidade**: Todas as ações são registradas com identificação do usuário
- **Flexibilidade**: Diferentes níveis de acesso para diferentes funções
- **Simplicidade**: Interface clara sobre o que cada usuário pode fazer

---

## 👥 CARGOS DISPONÍVEIS

O sistema possui **6 (seis) cargos** diferentes:

### 1. 👑 COMANDANTE
- **Nível**: Máximo
- **Cor do Badge**: Roxo
- **Descrição**: Acesso total ao sistema

### 2. 🛡️ ADMINISTRADOR
- **Nível**: Máximo
- **Cor do Badge**: Azul
- **Descrição**: Acesso administrativo completo

### 3. 💻 DESENVOLVEDOR
- **Nível**: Alto
- **Cor do Badge**: Verde
- **Descrição**: Acesso técnico completo

### 4. 👮 GUARDA
- **Nível**: Médio
- **Cor do Badge**: Ciano
- **Descrição**: Pode cadastrar e editar, mas não excluir

### 5. 📚 ESTAGIÁRIO
- **Nível**: Baixo
- **Cor do Badge**: Amarelo
- **Descrição**: Apenas visualização (read-only)

### 6. 👁️ VISUALIZADOR
- **Nível**: Baixo
- **Cor do Badge**: Cinza
- **Descrição**: Apenas visualização (read-only)

---

## 📊 MATRIZ DE PERMISSÕES

| Cargo | Visualizar | Criar Cadastro | Editar Cadastro | Excluir Cadastro | Acesso Admin |
|-------|------------|----------------|-----------------|------------------|--------------|
| **👑 Comandante** | ✅ Sim | ✅ Sim | ✅ Sim | ✅ Sim | ✅ Sim |
| **🛡️ Administrador** | ✅ Sim | ✅ Sim | ✅ Sim | ✅ Sim | ✅ Sim |
| **💻 Desenvolvedor** | ✅ Sim | ✅ Sim | ✅ Sim | ✅ Sim | ❌ Não |
| **👮 Guarda** | ✅ Sim | ✅ Sim | ✅ Sim | ❌ Não | ❌ Não |
| **📚 Estagiário** | ✅ Sim | ❌ Não | ❌ Não | ❌ Não | ❌ Não |
| **👁️ Visualizador** | ✅ Sim | ❌ Não | ❌ Não | ❌ Não | ❌ Não |

### Legenda:
- ✅ **Sim**: Permissão concedida
- ❌ **Não**: Permissão negada

---

## 📝 DESCRIÇÃO DETALHADA DOS CARGOS

### 👑 COMANDANTE

**Responsabilidades:**
- Supervisão geral do sistema
- Gerenciamento de usuários
- Acesso a todas as funcionalidades
- Exclusão de registros críticos

**Permissões:**
- ✅ Visualizar todos os cadastros
- ✅ Criar novos cadastros
- ✅ Editar cadastros existentes
- ✅ Excluir cadastros
- ✅ Gerenciar usuários (via Supabase)
- ✅ Acesso a relatórios e estatísticas

**Interface:**
- Todos os botões visíveis
- Sem restrições de acesso
- Pode realizar qualquer operação

---

### 🛡️ ADMINISTRADOR

**Responsabilidades:**
- Administração do sistema
- Gerenciamento de dados
- Suporte aos usuários
- Manutenção de registros

**Permissões:**
- ✅ Visualizar todos os cadastros
- ✅ Criar novos cadastros
- ✅ Editar cadastros existentes
- ✅ Excluir cadastros
- ✅ Gerenciar usuários (via Supabase)
- ✅ Acesso a relatórios e estatísticas

**Interface:**
- Todos os botões visíveis
- Sem restrições de acesso
- Pode realizar qualquer operação

---

### 💻 DESENVOLVEDOR

**Responsabilidades:**
- Desenvolvimento e manutenção do sistema
- Correção de bugs
- Implementação de novas funcionalidades
- Suporte técnico

**Permissões:**
- ✅ Visualizar todos os cadastros
- ✅ Criar novos cadastros
- ✅ Editar cadastros existentes
- ✅ Excluir cadastros
- ❌ Gerenciar usuários (apenas via código)
- ✅ Acesso a logs e diagnósticos

**Interface:**
- Todos os botões de ação visíveis
- Pode excluir registros para testes
- Acesso técnico completo

---

### 👮 GUARDA

**Responsabilidades:**
- Cadastramento de moradores durante abordagens
- Atualização de informações em campo
- Registro de ocorrências
- Acompanhamento de casos

**Permissões:**
- ✅ Visualizar todos os cadastros
- ✅ Criar novos cadastros
- ✅ Editar cadastros existentes
- ❌ **Excluir cadastros** (botão oculto)
- ❌ Gerenciar usuários
- ✅ Fazer upload de fotos

**Interface:**
- Botão "Novo Cadastro" visível
- Botão "Editar" visível
- Botão "Excluir" **OCULTO**
- Pode adicionar e editar informações

**Caso de Uso:**
> Um guarda em patrulha encontra uma pessoa em situação de rua. Ele pode:
> - Criar um novo cadastro com todas as informações
> - Fazer upload de fotos
> - Editar informações posteriormente
> - **MAS NÃO pode excluir** registros (proteção de dados)

---

### 📚 ESTAGIÁRIO

**Responsabilidades:**
- Aprendizado e observação
- Consulta de informações
- Suporte em atividades supervisionadas
- Geração de relatórios

**Permissões:**
- ✅ Visualizar todos os cadastros
- ❌ **Criar novos cadastros** (botão desabilitado)
- ❌ **Editar cadastros** (botão oculto)
- ❌ **Excluir cadastros** (botão oculto)
- ❌ Gerenciar usuários
- ✅ Visualizar fotos e documentos

**Interface:**
- Alerta: "⚠️ Modo Visualização - Você não tem permissão para editar"
- Botão "Novo Cadastro" desabilitado
- Botões "Editar" e "Excluir" ocultos
- Todos os campos do formulário desabilitados

**Caso de Uso:**
> Um estagiário precisa consultar informações para um relatório. Ele pode:
> - Visualizar todos os cadastros
> - Pesquisar por nome, CPF ou local
> - Ver fotos e detalhes completos
> - **MAS NÃO pode modificar** nenhuma informação

---

### 👁️ VISUALIZADOR

**Responsabilidades:**
- Consulta de informações
- Visualização de dados para fins específicos
- Acesso limitado para parceiros externos
- Geração de relatórios básicos

**Permissões:**
- ✅ Visualizar todos os cadastros
- ❌ **Criar novos cadastros** (botão desabilitado)
- ❌ **Editar cadastros** (botão oculto)
- ❌ **Excluir cadastros** (botão oculto)
- ❌ Gerenciar usuários
- ✅ Visualizar fotos e documentos

**Interface:**
- Alerta: "⚠️ Modo Visualização - Você não tem permissão para editar"
- Botão "Novo Cadastro" desabilitado
- Botões "Editar" e "Excluir" ocultos
- Todos os campos do formulário desabilitados

**Caso de Uso:**
> Um parceiro da assistência social precisa consultar informações. Ele pode:
> - Visualizar cadastros específicos
> - Pesquisar moradores
> - Ver histórico e fotos
> - **MAS NÃO pode criar ou modificar** registros

---

## 🔧 COMO ATRIBUIR CARGOS

### Método 1: Via Supabase Dashboard (Recomendado)

**Passo a Passo:**

1. **Acessar o Supabase**
   - URL: https://supabase.com/dashboard
   - Faça login com suas credenciais

2. **Navegar até a Tabela de Perfis**
   - No menu lateral, clique em "Table Editor"
   - Selecione a tabela "profiles"

3. **Localizar o Usuário**
   - Use a busca para encontrar o usuário pelo email
   - Ou role a lista até encontrá-lo

4. **Editar o Cargo**
   - Clique na célula da coluna "cargo"
   - Selecione o cargo desejado no dropdown:
     - `comandante`
     - `administrador`
     - `desenvolvedor`
     - `guarda`
     - `estagiario`
     - `visualizador`

5. **Salvar**
   - Pressione Enter ou clique no ícone de ✓
   - A alteração é imediata

---

### Método 2: Via SQL

**Definir Cargo Individual:**

```sql
-- Definir como Comandante
UPDATE profiles 
SET cargo = 'comandante'
WHERE id = (SELECT id FROM auth.users WHERE email = 'usuario@email.com');

-- Definir como Guarda
UPDATE profiles 
SET cargo = 'guarda'
WHERE id = (SELECT id FROM auth.users WHERE email = 'guarda@email.com');

-- Definir como Estagiário
UPDATE profiles 
SET cargo = 'estagiario'
WHERE id = (SELECT id FROM auth.users WHERE email = 'estagiario@email.com');
```

**Definir Cargo em Lote:**

```sql
-- Definir múltiplos guardas
UPDATE profiles 
SET cargo = 'guarda'
WHERE id IN (
  SELECT id FROM auth.users 
  WHERE email IN (
    'guarda1@email.com',
    'guarda2@email.com',
    'guarda3@email.com'
  )
);
```

**Verificar Cargos Atuais:**

```sql
-- Listar todos os usuários e seus cargos
SELECT 
  u.email,
  p.cargo,
  p.created_at as cadastrado_em
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
ORDER BY p.cargo, u.email;
```

---

## 📌 RASTREAMENTO DE AUTORIA

### Como Funciona

Todos os cadastros criados no sistema salvam automaticamente:

**Informações Registradas:**
- `criado_por_id`: UUID do usuário que criou
- `criado_por_nome`: Email do usuário que criou
- `created_at`: Data e hora da criação

**Visualização na Interface:**

```
┌────────────────────────────────────────┐
│ Detalhes do Cadastro                   │
│                                        │
│ 👤 Registrado por: joao@gm.laguna.sc   │
│ 📅 Cadastrado em: 28/10/2025 às 14:30  │
└────────────────────────────────────────┘
```

### Benefícios

1. **Responsabilização**: Saber quem criou cada registro
2. **Auditoria**: Rastrear ações no sistema
3. **Qualidade**: Identificar quem precisa de treinamento
4. **Segurança**: Detectar uso indevido do sistema

### Consultar Registros por Criador

```sql
-- Ver todos os cadastros de um usuário
SELECT 
  nome_completo,
  local_abordagem,
  created_at,
  criado_por_nome
FROM moradores
WHERE criado_por_nome = 'usuario@email.com'
ORDER BY created_at DESC;

-- Estatísticas por criador
SELECT 
  criado_por_nome,
  COUNT(*) as total_cadastros,
  MIN(created_at) as primeiro_cadastro,
  MAX(created_at) as ultimo_cadastro
FROM moradores
WHERE criado_por_nome IS NOT NULL
GROUP BY criado_por_nome
ORDER BY total_cadastros DESC;
```

---

## 💼 CASOS DE USO

### Caso 1: Abordagem em Campo

**Situação:**
> Guarda Municipal em patrulha encontra pessoa em situação de rua

**Cargo Necessário:** Guarda ou superior

**Fluxo:**
1. Guarda acessa o sistema pelo celular
2. Clica em "Novo Cadastro"
3. Preenche informações da pessoa
4. Tira foto de identificação
5. Adiciona fotos adicionais (local, pertences)
6. Registra localização (bairro, rua)
7. Salva o cadastro
8. Sistema registra automaticamente: criado por [nome do guarda]

---

### Caso 2: Atualização de Informações

**Situação:**
> Morador retorna ao local e guarda precisa atualizar dados

**Cargo Necessário:** Guarda ou superior

**Fluxo:**
1. Guarda busca o morador pelo nome ou CPF
2. Clica em "Editar"
3. Atualiza informações necessárias
4. Adiciona novas fotos se necessário
5. Salva as alterações
6. Sistema mantém registro de quem criou originalmente

---

### Caso 3: Consulta para Relatório

**Situação:**
> Estagiário precisa gerar relatório mensal

**Cargo Necessário:** Estagiário ou superior

**Fluxo:**
1. Estagiário acessa "Cadastrados"
2. Visualiza estatísticas no topo da página
3. Pesquisa por critérios específicos
4. Visualiza detalhes dos cadastros
5. Anota informações para o relatório
6. **NÃO pode modificar** nenhum dado

---

### Caso 4: Exclusão de Registro Duplicado

**Situação:**
> Morador foi cadastrado duas vezes por engano

**Cargo Necessário:** Comandante, Administrador ou Desenvolvedor

**Fluxo:**
1. Usuário autorizado identifica duplicação
2. Verifica qual registro está mais completo
3. Clica em "Excluir" no registro duplicado
4. Confirma a exclusão
5. Sistema remove o registro permanentemente
6. **Guarda NÃO vê o botão de excluir** (proteção)

---

### Caso 5: Parceiro Externo Consulta

**Situação:**
> Assistente social precisa consultar informações

**Cargo Necessário:** Visualizador

**Fluxo:**
1. Assistente social recebe acesso como Visualizador
2. Faz login no sistema
3. Busca o morador específico
4. Visualiza todas as informações
5. Vê fotos e histórico
6. **NÃO pode criar, editar ou excluir**

---

## ❓ PERGUNTAS FREQUENTES

### 1. Como criar um novo usuário?

**R:** Apenas administradores podem criar usuários via Supabase Dashboard:
1. Acesse: https://supabase.com/dashboard
2. Vá em "Authentication" → "Users"
3. Clique em "Add User"
4. Preencha email e senha
5. Marque "Auto Confirm User"
6. Clique em "Create User"
7. Depois, defina o cargo na tabela "profiles"

---

### 2. Qual cargo devo atribuir para guardas em campo?

**R:** Use o cargo **"Guarda"**. Ele permite:
- Criar novos cadastros durante abordagens
- Editar informações posteriormente
- **MAS NÃO permite excluir** (proteção de dados)

---

### 3. Estagiários podem criar cadastros?

**R:** **NÃO**. Estagiários têm acesso apenas de visualização (read-only). Eles podem:
- Ver todos os cadastros
- Pesquisar informações
- Visualizar fotos e detalhes
- **MAS NÃO podem criar, editar ou excluir**

---

### 4. Quem pode excluir cadastros?

**R:** Apenas:
- 👑 Comandante
- 🛡️ Administrador
- 💻 Desenvolvedor

**NÃO podem excluir:**
- 👮 Guarda (botão oculto)
- 📚 Estagiário (botão oculto)
- 👁️ Visualizador (botão oculto)

---

### 5. Como saber quem criou um cadastro?

**R:** Ao visualizar os detalhes de um cadastro, você verá:
```
👤 Registrado por: usuario@email.com
📅 Cadastrado em: 28/10/2025 às 14:30
```

Ou via SQL:
```sql
SELECT criado_por_nome, created_at 
FROM moradores 
WHERE id = 'id-do-cadastro';
```

---

### 6. Posso mudar o cargo de um usuário?

**R:** **SIM**, se você for Comandante ou Administrador:
1. Acesse Supabase Dashboard
2. Vá em "Table Editor" → "profiles"
3. Encontre o usuário
4. Edite a coluna "cargo"
5. Salve

A mudança é **imediata** e o usuário verá as novas permissões no próximo login.

---

### 7. O que acontece se eu tentar fazer algo sem permissão?

**R:** O sistema previne ações não autorizadas:
- **Botões ficam ocultos** (Editar/Excluir para read-only)
- **Campos ficam desabilitados** (formulários para read-only)
- **Alerta aparece**: "⚠️ Modo Visualização - Você não tem permissão para editar"

---

### 8. Qual a diferença entre Estagiário e Visualizador?

**R:** **Nenhuma diferença técnica**. Ambos têm:
- Acesso apenas de visualização
- Não podem criar, editar ou excluir
- Veem o mesmo alerta de "Modo Visualização"

A diferença é apenas **semântica**:
- **Estagiário**: Para pessoas em treinamento interno
- **Visualizador**: Para parceiros externos ou consultores

---

### 9. Desenvolvedor é diferente de Administrador?

**R:** **SIM**. A única diferença é:
- **Administrador**: Tem flag `isAdmin = true`
- **Desenvolvedor**: Tem flag `isAdmin = false`

Ambos podem criar, editar e excluir. A flag `isAdmin` pode ser usada para funcionalidades futuras de administração do sistema.

---

### 10. Como adicionar o cargo "Guarda" no banco?

**R:** Execute este SQL no Supabase:
```sql
ALTER TYPE public.cargo_usuario ADD VALUE IF NOT EXISTS 'guarda';
```

Depois, você pode atribuir este cargo aos usuários normalmente.

---

## 📞 SUPORTE

### Contatos:
- **Email**: suporte@gm.laguna.sc.gov.br
- **Telefone**: (48) XXXX-XXXX
- **Horário**: Segunda a Sexta, 8h às 18h

### Documentação Adicional:
- `SISTEMA_CARGOS_PERMISSOES.md` - Documentação técnica completa
- `GUIA_RAPIDO_CARGOS.md` - Guia rápido de implementação
- `PERMISSOES_ATUALIZADAS.md` - Matriz atualizada de permissões

---

## 📄 INFORMAÇÕES DO DOCUMENTO

**Versão:** 1.0  
**Data:** 28 de Outubro de 2025  
**Autor:** Sistema de Gestão - Guarda Municipal de Laguna  
**Última Atualização:** 28/10/2025  

---

**© 2025 Guarda Municipal de Laguna - SC**  
**Todos os direitos reservados**
