# 📸 Sistema de Múltiplas Fotos

## Funcionalidade Implementada

O sistema agora suporta **dois tipos de fotos** para cada morador cadastrado:

### 1. **Foto Principal de Identificação** 
- Foto única e obrigatória para identificar o morador
- Aparece como foto de perfil nos cadastros
- Ideal para foto do rosto da pessoa

### 2. **Fotos Adicionais**
- Múltiplas fotos complementares (ilimitadas)
- Podem incluir:
  - Documentos (RG, CPF, etc.)
  - Situação do local onde a pessoa se encontra
  - Fotos do ambiente
  - Qualquer outra evidência relevante

---

## 🎯 Como Usar

### Ao Criar um Novo Cadastro:

1. **Foto Principal**
   - Clique em "Escolher Foto Principal"
   - Selecione uma foto do dispositivo
   - A preview aparecerá automaticamente

2. **Fotos Adicionais**
   - Clique em "Adicionar Mais Fotos"
   - Selecione uma ou múltiplas fotos de uma vez
   - As previews aparecerão em grade
   - Para remover: passe o mouse sobre a foto e clique no X vermelho

3. **Salvar**
   - Clique em "Salvar Cadastro"
   - Todas as fotos serão enviadas automaticamente

### Ao Editar um Cadastro Existente:

1. As fotos já cadastradas aparecerão na seção de fotos adicionais
2. Você pode:
   - Remover fotos existentes (clique no X)
   - Adicionar novas fotos
   - Alterar a foto principal

---

## 🔧 Estrutura Técnica

### Banco de Dados

**Nova Tabela: `morador_fotos`**
```sql
- id: UUID (chave primária)
- morador_id: UUID (referência ao morador)
- foto_url: TEXT (URL da foto no storage)
- descricao: TEXT (descrição opcional)
- ordem: INTEGER (ordem de exibição)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

**Tabela Existente: `moradores`**
- `foto_url`: Continua armazenando a foto principal

### Storage

- Bucket: `morador-fotos`
- Fotos principais: `{user_id}-{timestamp}.{ext}`
- Fotos adicionais: `{user_id}-{morador_id}-{timestamp}-{index}.{ext}`

### Políticas de Segurança (RLS)

✅ Usuários autenticados podem:
- Ver todas as fotos
- Adicionar fotos aos moradores que criaram
- Atualizar/deletar fotos dos moradores que criaram

❌ Usuários não autenticados:
- Não têm acesso às fotos

---

## 📊 Benefícios

1. **Documentação Completa**
   - Registre múltiplos aspectos da situação
   - Mantenha evidências visuais

2. **Organização**
   - Foto principal para identificação rápida
   - Fotos adicionais para detalhes

3. **Flexibilidade**
   - Adicione quantas fotos precisar
   - Remova fotos desnecessárias

4. **Segurança**
   - Todas as fotos protegidas por autenticação
   - Controle de acesso por usuário

---

## 🚀 Próximos Passos

Para aplicar as mudanças no banco de dados:

1. **Executar a migração no Supabase:**
   - Acesse: https://supabase.com/dashboard
   - Vá em **SQL Editor**
   - Copie o conteúdo de: `supabase/migrations/20251028000000_add_fotos_adicionais.sql`
   - Execute o SQL

2. **Verificar as políticas:**
   - Vá em **Authentication** → **Policies**
   - Verifique se as políticas da tabela `morador_fotos` foram criadas

3. **Testar:**
   - Crie um novo cadastro
   - Adicione múltiplas fotos
   - Verifique se aparecem corretamente

---

## 💡 Dicas de Uso

- **Foto Principal**: Use sempre uma foto clara do rosto
- **Fotos Adicionais**: 
  - Documentos: Tire fotos legíveis
  - Local: Capture o contexto da abordagem
  - Situação: Registre condições relevantes

- **Performance**: 
  - Evite fotos muito grandes (> 5MB)
  - O sistema aceita: JPG, PNG, WEBP, etc.

---

## 🐛 Solução de Problemas

### Erro ao fazer upload de fotos:
- Verifique se está autenticado
- Confirme que o bucket `morador-fotos` existe no Supabase
- Verifique as permissões do storage

### Fotos não aparecem:
- Verifique se a migração foi executada
- Confirme que as políticas RLS estão ativas
- Verifique o console do navegador (F12) para erros

### Fotos muito lentas:
- Reduza o tamanho das imagens antes do upload
- Verifique sua conexão com a internet
