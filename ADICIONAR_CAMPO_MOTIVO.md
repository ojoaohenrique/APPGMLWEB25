# Adicionar Campo "Motivo da Situação de Rua"

## 📋 Instruções para Adicionar no Supabase

### 1. Acesse o Supabase
1. Vá em: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** (no menu lateral)

### 2. Execute este SQL

```sql
-- Adicionar coluna motivo_situacao_rua na tabela moradores
ALTER TABLE moradores 
ADD COLUMN motivo_situacao_rua TEXT;

-- Adicionar comentário na coluna
COMMENT ON COLUMN moradores.motivo_situacao_rua IS 'Motivo pelo qual a pessoa está em situação de rua';
```

### 3. Clique em "Run" para executar

### 4. Verifique se foi criado
```sql
-- Verificar estrutura da tabela
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'moradores'
ORDER BY ordinal_position;
```

---

## ✅ Pronto!

Agora o campo está disponível no banco de dados e o código já está preparado para usá-lo.

**Próximos passos:**
1. ✅ Campo adicionado no type `Morador`
2. ⏳ Adicionar no formulário de cadastro
3. ⏳ Adicionar no formulário de edição
4. ⏳ Exibir nas páginas de visualização
5. ⏳ Incluir na exportação de dados
