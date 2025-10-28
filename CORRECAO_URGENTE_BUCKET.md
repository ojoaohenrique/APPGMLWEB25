# 🚨 CORREÇÃO URGENTE: Erro "Bucket not found"

## ❌ Problema Identificado

O erro **"Bucket not found"** aparece porque o bucket de storage `morador-fotos` não foi criado no Supabase.

---

## ✅ SOLUÇÃO RÁPIDA (Execute AGORA)

### Opção 1: Via Interface do Supabase (MAIS FÁCIL)

1. **Acesse**: https://supabase.com/dashboard
2. **Selecione seu projeto**
3. **Vá em**: Storage (menu lateral)
4. **Clique em**: "New bucket"
5. **Preencha**:
   - **Name**: `morador-fotos`
   - **Public bucket**: ✅ **MARQUE ESTA OPÇÃO**
   - **File size limit**: 5 MB
   - **Allowed MIME types**: Deixe vazio (aceita todos os tipos de imagem)
6. **Clique em**: "Create bucket"

**Pronto!** O erro será corrigido.

---

### Opção 2: Via SQL Editor (ALTERNATIVA)

1. **Acesse**: https://supabase.com/dashboard
2. **Vá em**: SQL Editor
3. **Cole e execute este SQL**:

```sql
-- Criar bucket para fotos dos moradores
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'morador-fotos',
  'morador-fotos',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
);

-- Criar policies de acesso
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
```

4. **Clique em**: "Run"

---

## 🔍 Como Verificar se Funcionou

1. **No Supabase Dashboard**:
   - Vá em **Storage**
   - Você deve ver o bucket `morador-fotos` listado
   - Status deve estar **Public**

2. **No Sistema**:
   - Tente cadastrar um morador novamente
   - Adicione uma foto
   - Clique em "Salvar Cadastro"
   - **Não deve mais aparecer o erro "Bucket not found"**

---

## 📋 Checklist de Verificação

Após criar o bucket, verifique:

- [ ] Bucket `morador-fotos` existe no Storage
- [ ] Bucket está marcado como **Public**
- [ ] Policies foram criadas (4 policies)
- [ ] Teste de upload funciona
- [ ] Cadastro salva com sucesso

---

## 🎯 Próximos Passos Após Corrigir

Depois que o bucket estiver criado:

1. **Teste o cadastro**:
   - Preencha todos os campos obrigatórios
   - Adicione uma foto principal
   - Adicione fotos adicionais (opcional)
   - Clique em "Salvar Cadastro"

2. **Verifique os logs no console** (F12):
   - Deve aparecer: ✅ "Cadastro salvo com sucesso!"
   - Não deve ter erros vermelhos

3. **Confirme no banco**:
   - Vá em **Table Editor → moradores**
   - O novo cadastro deve aparecer na lista

---

## ⚠️ IMPORTANTE

**Execute a correção ANTES de tentar cadastrar novamente!**

O bucket é essencial para:
- ✅ Salvar foto principal
- ✅ Salvar fotos adicionais
- ✅ Completar o cadastro com sucesso

---

## 🆘 Se o Erro Persistir

1. **Verifique se o bucket foi criado**:
   - Storage → deve listar `morador-fotos`

2. **Verifique as policies**:
   - Storage → morador-fotos → Policies
   - Deve ter 4 policies ativas

3. **Limpe o cache do navegador**:
   - Ctrl + Shift + Delete
   - Limpar cache e cookies

4. **Recarregue a página**:
   - F5 ou Ctrl + R

---

## 📞 Suporte

Se ainda tiver problemas:
1. Abra o console do navegador (F12)
2. Vá na aba "Console"
3. Copie todos os erros em vermelho
4. Me envie os logs para análise

---

**Execute a correção agora e teste novamente!** 🚀
