# 🔐 Guia de Gerenciamento de Logins

## ⚠️ IMPORTANTE: Sistema Configurado para Máxima Segurança

**APENAS VOCÊ** pode criar novos usuários através do painel do Supabase.
O cadastro público foi **DESABILITADO** por segurança.

---

## ✅ Método ÚNICO: Criar Usuários pelo Painel do Supabase

### Passo a Passo:

1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard
   - Faça login com sua conta
   - Selecione o projeto: `xzkdzjibhdachyinhlrb`

2. **Navegue até Authentication**
   - No menu lateral esquerdo, clique em **Authentication**
   - Clique na aba **Users**

3. **Adicione um Novo Usuário**
   - Clique no botão verde **Add user** (canto superior direito)
   - Selecione **Create new user**
   
4. **Preencha os Dados**
   - **Email**: Digite o email do usuário (ex: `admin@laguna.gov.br`)
   - **Password**: Crie uma senha segura (mínimo 6 caracteres)
   - **Auto Confirm User**: ✅ **MARQUE ESTA OPÇÃO** (importante!)
     - Isso permite que o usuário faça login imediatamente sem confirmar email
   
5. **Clique em "Create user"**

### ✅ Pronto! O usuário já pode fazer login no sistema.

---

## 🚫 Cadastro Público DESABILITADO

Por questões de segurança, o cadastro público foi removido do sistema.

**O que foi removido:**
- ❌ Página `/cadastro-admin` não existe mais
- ❌ Link "Criar nova conta" removido da tela de login
- ❌ Usuários não podem se auto-cadastrar

**Tela de login atual:**
- ✅ Apenas permite login
- ✅ Mensagem: "Não possui acesso? Entre em contato com o administrador"

---

## 📋 Gerenciar Usuários Existentes

### Ver Todos os Usuários:

1. Acesse: https://supabase.com/dashboard
2. Vá em **Authentication** → **Users**
3. Você verá a lista de todos os usuários cadastrados

### Editar um Usuário:

1. Na lista de usuários, clique no email do usuário
2. Você pode:
   - ✏️ Alterar o email
   - 🔑 Resetar a senha
   - ✅ Confirmar o email manualmente
   - 🗑️ Deletar o usuário

### Resetar Senha de um Usuário:

**Opção A - Pelo Painel:**
1. Clique no usuário
2. Clique em **"Send password reset email"**
3. O usuário receberá um email para criar nova senha

**Opção B - Manualmente:**
1. Clique no usuário
2. Role até **"Password"**
3. Digite uma nova senha
4. Clique em **"Update user"**

---

## 🔒 Configurações de Segurança (RECOMENDADO)

### ⚠️ Desabilitar Cadastro Público no Supabase

Para garantir segurança máxima, desabilite o cadastro via API:

1. Acesse: https://supabase.com/dashboard
2. Vá em **Authentication** → **Providers**
3. Clique em **Email**
4. **Desmarque**: "Enable email signup"
5. Clique em **Save**

**Resultado:**
- ✅ Login continua funcionando normalmente
- ❌ Cadastro via API completamente bloqueado
- ✅ Apenas você cria usuários pelo painel do Supabase
- ✅ Proteção contra cadastros não autorizados

**Status Atual:**
- ✅ Cadastro removido da aplicação
- ⚠️ Recomendado: Desabilitar também no Supabase

---

## 👥 Usuários Padrão Sugeridos

Recomendo criar estes usuários iniciais:

| Email | Função | Senha |
|-------|--------|-------|
| `admin@laguna.gov.br` | Administrador Principal | (senha forte) |
| `guarda@laguna.gov.br` | Operador | (senha forte) |

---

## 🆘 Problemas Comuns

### "Email not confirmed"
- **Solução**: No painel do Supabase, marque **"Auto Confirm User"** ao criar
- Ou confirme manualmente: clique no usuário → **"Confirm email"**

### "Invalid login credentials"
- Verifique se o email e senha estão corretos
- Verifique se o usuário foi confirmado
- Tente resetar a senha

### Não recebo o email de confirmação
- Verifique a pasta de spam
- Configure um provedor de email no Supabase (Settings → Auth → Email Templates)
- Ou confirme manualmente pelo painel

---

## 📝 Resumo Rápido

### Para criar um usuário AGORA:

1. Vá em: https://supabase.com/dashboard
2. **Authentication** → **Users** → **Add user**
3. Preencha email e senha
4. ✅ Marque **"Auto Confirm User"**
5. **Create user**
6. Pronto! Pode fazer login.

---

## 🔗 Links Úteis

- **Painel Supabase**: https://supabase.com/dashboard
- **Página de Login**: https://seu-site.vercel.app/auth
- **Documentação de Segurança**: Ver arquivo `CONFIGURACAO_SEGURANCA.md`
