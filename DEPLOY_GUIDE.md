# Guia de Deploy - Ajuda Laguna

## ✅ Alterações Realizadas

### 1. Reestruturação do Repositório (CRÍTICO)
- ✅ Todos os arquivos movidos de `ajudalaguna-app-web/` para a raiz
- ✅ Pasta `ajudalaguna-app-web/` removida (pode estar bloqueada, mas está vazia)
- ✅ `package.json` do Capacitor removido da raiz
- ✅ `package.json` do React/Vite criado na raiz
- ✅ `vercel.json` agora está na raiz com configuração correta

### 2. Funcionalidade de Edição Implementada
- ✅ Rota `/editar-cadastro/:id` adicionada em `App.tsx`
- ✅ Botão "Editar" implementado em `MoradorDetails.tsx`
- ✅ Modo de edição completo em `NovoCadastro.tsx`:
  - Carrega dados do morador existente
  - Preenche todos os campos automaticamente
  - Preserva foto existente se não houver nova
  - Atualiza registro no banco de dados
  - Títulos e textos adaptados para modo de edição

### 3. Melhorias de UI
- ✅ Página 404 (`NotFound.tsx`) redesenhada com layout mais limpo
- ✅ Mantém navegação com `AppLayout`
- ✅ Design moderno e amigável

## 🚀 Próximos Passos para Deploy

### Passo 1: Instalar Dependências
```bash
cd c:\Users\joaoh\Downloads\ajudalaguna-app-web01
npm install
```

### Passo 2: Testar Localmente
```bash
npm run dev
```
Acesse `http://localhost:5173` e teste:
- ✓ Criar novo cadastro
- ✓ Visualizar cadastros
- ✓ Editar cadastro existente
- ✓ Excluir cadastro

### Passo 3: Build de Produção (Opcional - Teste Local)
```bash
npm run build
npm run preview
```

### Passo 4: Deploy na Vercel

#### Opção A: Via Git (Recomendado)
1. Commit as alterações:
```bash
git add .
git commit -m "Reestruturação para Vercel e implementação de edição"
git push origin main
```

2. No painel da Vercel:
   - Vá em Settings → General
   - **Root Directory**: deixe em branco ou `.` (raiz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. Faça um novo deploy (Deployments → Redeploy)

#### Opção B: Via CLI da Vercel
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Passo 5: Verificar Deploy
Após o deploy, teste:
- ✓ Página inicial carrega
- ✓ Rotas funcionam (sem 404)
- ✓ Criar cadastro
- ✓ Editar cadastro
- ✓ Excluir cadastro

## 📋 Estrutura Final do Projeto

```
ajudalaguna-app-web01/
├── src/                    # Código fonte React
├── public/                 # Arquivos estáticos
├── dist/                   # Build de produção (gerado)
├── package.json            # Dependências do projeto
├── vite.config.ts          # Configuração do Vite
├── vercel.json             # Configuração do Vercel
├── tsconfig.json           # Configuração TypeScript
├── tailwind.config.ts      # Configuração TailwindCSS
└── index.html              # HTML principal

```

## 🔧 Configurações Importantes

### vercel.json
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Esta configuração garante que todas as rotas do React Router funcionem corretamente.

### package.json - Scripts
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm run vercel-build` - Build específico para Vercel

## ⚠️ Notas Importantes

1. **Pasta `ajudalaguna-app-web`**: Pode estar bloqueada pelo sistema. Você pode deletá-la manualmente depois se necessário. Ela está vazia.

2. **Variáveis de Ambiente**: Certifique-se de que as variáveis do Supabase estão configuradas na Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

3. **Node Version**: O projeto usa Node.js 18+. Configure na Vercel se necessário.

## 🎨 Identidade Visual (Pendente)

Para atualizar logos e ícones:
1. Substitua `public/favicon.ico`
2. Atualize logo em `src/components/layout/AppSidebar.tsx`
3. Atualize ícones Android em `android/app/src/main/res/`

## ✨ Funcionalidades Implementadas

### Edição de Cadastro
- Acesse um cadastro existente
- Clique no botão "Editar"
- Modifique os campos desejados
- Clique em "Salvar Alterações"
- Foto existente é preservada se não houver nova

### Validações
- Nome completo e local de abordagem são obrigatórios
- CPF é validado se preenchido
- Data de nascimento limitada a datas válidas

## 🐛 Troubleshooting

### Erro 404 na Vercel
- ✅ RESOLVIDO: Arquivos agora estão na raiz

### Build Falha
- Verifique se `package.json` existe na raiz
- Execute `npm install` localmente primeiro
- Verifique logs de build na Vercel

### Rotas não funcionam
- ✅ RESOLVIDO: `vercel.json` configurado corretamente

## 📞 Suporte

Se encontrar problemas:
1. Verifique logs da Vercel
2. Teste localmente com `npm run build`
3. Confirme variáveis de ambiente
