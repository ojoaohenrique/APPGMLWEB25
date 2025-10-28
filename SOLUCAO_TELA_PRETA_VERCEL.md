# 🔧 Solução: Tela Preta no Vercel

## Problema
Após o deploy no Vercel, apenas uma tela preta aparece. Isso ocorre porque as **variáveis de ambiente do Supabase não estão configuradas** no Vercel.

## Causa
O arquivo `src/integrations/supabase/client.ts` lança um erro quando as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` não estão definidas, impedindo que a aplicação carregue.

## Solução Passo a Passo

### 1️⃣ Obter as Credenciais do Supabase

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie os seguintes valores:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon/public key** (VITE_SUPABASE_ANON_KEY)

### 2️⃣ Configurar no Vercel

1. Acesse seu projeto no Vercel: https://vercel.com/dashboard
2. Clique no projeto **ajudalaguna-app-web**
3. Vá em **Settings** → **Environment Variables**
4. Adicione as seguintes variáveis:

   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | Cole a URL do seu projeto Supabase |
   | `VITE_SUPABASE_ANON_KEY` | Cole a chave anônima do Supabase |

5. Selecione os ambientes: **Production**, **Preview**, e **Development**
6. Clique em **Save**

### 3️⃣ Fazer Novo Deploy

Após adicionar as variáveis, você precisa fazer um novo deploy:

**Opção A - Pelo Dashboard do Vercel:**
1. Vá em **Deployments**
2. Clique nos três pontos do último deploy
3. Clique em **Redeploy**

**Opção B - Pelo Git:**
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

### 4️⃣ Verificar

Após o deploy:
1. Acesse o site
2. A aplicação deve carregar normalmente
3. Você deve ver a página de login

## ✅ Checklist

- [ ] Obtive as credenciais do Supabase
- [ ] Adicionei `VITE_SUPABASE_URL` no Vercel
- [ ] Adicionei `VITE_SUPABASE_ANON_KEY` no Vercel
- [ ] Fiz um novo deploy
- [ ] A aplicação está funcionando

## 🚨 Problemas Comuns

### Ainda aparece tela preta
- Verifique se as variáveis foram salvas corretamente
- Certifique-se de ter feito um novo deploy após adicionar as variáveis
- Abra o console do navegador (F12) para ver erros específicos

### Erro de autenticação
- Verifique se a URL do Supabase está correta (deve começar com https://)
- Verifique se a chave anônima está correta
- Certifique-se de que o projeto Supabase está ativo

## 📝 Nota Importante

As variáveis de ambiente **não são incluídas no código** por questões de segurança. Por isso, você precisa configurá-las manualmente no Vercel toda vez que fizer deploy de um novo projeto.
