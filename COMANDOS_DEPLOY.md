# Comandos para Deploy

## 1. Commit e Push para GitHub

Execute estes comandos no terminal (PowerShell):

```powershell
# Já fizemos: git add .

# Fazer commit
git commit -m "Atualizacao-final"

# Fazer push para GitHub
git push origin main
```

## 2. Deploy no Vercel

### Opção A: Via Interface Web (Recomendado)

1. Acesse: https://vercel.com/
2. Faça login com sua conta
3. Clique em "Add New" → "Project"
4. Selecione o repositório do GitHub: `ajudalaguna-app-web`
5. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL` = `https://pzegbvsrxiarqsorwvdn.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = (sua chave do Supabase)
6. Clique em "Deploy"

### Opção B: Via CLI

```powershell
# Instalar Vercel CLI (se ainda não tiver)
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

## 3. Configurar Variáveis de Ambiente no Vercel

Após o deploy, adicione as variáveis:

1. Vá em: Project Settings → Environment Variables
2. Adicione:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Faça redeploy

## 4. Verificar Deploy

Após o deploy, você receberá uma URL como:
- `https://ajudalaguna-app-web.vercel.app`

Teste:
- Login
- Cadastro de moradores
- Edição
- Estatísticas

## 5. Domínio Customizado (Opcional)

Se quiser usar um domínio próprio:
1. Vá em: Project Settings → Domains
2. Adicione seu domínio
3. Configure os DNS conforme instruções

---

## Checklist Pós-Deploy

- [ ] Testar login
- [ ] Testar cadastro
- [ ] Testar edição
- [ ] Verificar estatísticas
- [ ] Testar no mobile
- [ ] Verificar logo
- [ ] Testar link BNMP

---

## Suporte

Em caso de problemas:
1. Verifique os logs no Vercel
2. Confirme as variáveis de ambiente
3. Teste localmente primeiro (`npm run dev`)
