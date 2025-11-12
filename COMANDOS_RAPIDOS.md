# ⚡ Comandos Rápidos - Ajuda Laguna App

## 🚀 Build e Deploy

### Build Completo (Web + Android)
```powershell
# Opção 1: Usando o script automático
.\build-android.ps1

# Opção 2: Passo a passo manual
npm run build
npx cap sync android
npx cap open android
```

### Build apenas da Web
```powershell
npm run build
```

### Sincronizar código web com Android (sem rebuild)
```powershell
npx cap copy android
```

### Atualizar plugins nativos do Capacitor
```powershell
npx cap sync android
```

---

## 🔧 Desenvolvimento

### Iniciar servidor de desenvolvimento
```powershell
npm run dev
```

### Executar app no celular conectado via USB
```powershell
npx cap run android
```

### Ver logs do app em tempo real
```powershell
# Com celular conectado via USB
npx cap run android -l
```

---

## 📱 Android Studio

### Abrir projeto no Android Studio
```powershell
npx cap open android
```

### Gerar APK via linha de comando
```powershell
cd android
.\gradlew assembleDebug
cd ..
```

### Gerar APK de Release (assinado)
```powershell
cd android
.\gradlew assembleRelease
cd ..
```

### Limpar cache do Gradle
```powershell
cd android
.\gradlew clean
cd ..
```

---

## 🧪 Testes e Debug

### Verificar erros de lint
```powershell
npm run lint
```

### Ver estrutura do projeto Capacitor
```powershell
npx cap ls
```

### Verificar configuração do Capacitor
```powershell
npx cap doctor
```

---

## 📦 Gerenciamento de Dependências

### Instalar dependências
```powershell
npm install
```

### Atualizar Capacitor
```powershell
npm install @capacitor/core@latest @capacitor/cli@latest
npm install @capacitor/android@latest
```

### Verificar versões instaladas
```powershell
npx cap --version
npm list @capacitor/core
```

---

## 🗄️ Supabase (via navegador)

### Acessar Dashboard
```
https://supabase.com/dashboard
```

### Criar novo usuário
1. Authentication → Users → Add user → Create new user
2. Preencher email e senha
3. Confirmar

### Ver tabela de cadastros
1. Table Editor → cadastros
2. Ver/editar registros

### Ver Storage (fotos)
1. Storage → cadastros-fotos
2. Ver arquivos enviados

---

## 🔍 Troubleshooting

### Limpar cache do projeto
```powershell
# Limpar node_modules
Remove-Item -Recurse -Force node_modules
npm install

# Limpar build
Remove-Item -Recurse -Force dist
npm run build

# Limpar cache do Android
cd android
.\gradlew clean
cd ..
```

### Resetar projeto Android
```powershell
# CUIDADO: Isso remove a pasta android completamente
Remove-Item -Recurse -Force android
npx cap add android
npx cap sync android
```

### Verificar se porta está em uso
```powershell
# Ver processos na porta 5173 (Vite)
netstat -ano | findstr :5173

# Matar processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F
```

---

## 📊 Informações Úteis

### Estrutura de Pastas
```
ajudalaguna-app-web01/
├── src/                    # Código fonte React
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/             # Páginas da aplicação
│   ├── lib/               # Bibliotecas e utilitários
│   └── App.tsx            # Componente principal
├── android/               # Projeto Android nativo
│   └── app/
│       └── build/
│           └── outputs/
│               └── apk/   # APKs gerados
├── dist/                  # Build da web (gerado)
├── public/                # Arquivos estáticos
└── supabase/             # Configurações do Supabase
```

### Arquivos Importantes
- `capacitor.config.ts` - Configuração do Capacitor
- `package.json` - Dependências do projeto
- `vite.config.ts` - Configuração do Vite
- `.env` - Variáveis de ambiente (NÃO COMMITAR!)
- `android/app/src/main/AndroidManifest.xml` - Permissões do Android

### URLs Importantes
- **Vercel (Produção):** [Seu link da Vercel]
- **Supabase Dashboard:** https://supabase.com/dashboard
- **BNMP:** https://portalbnmp.cnj.jus.br/

---

## 🎯 Fluxo de Trabalho Típico

### 1. Fazer alterações no código
```powershell
# Edite os arquivos em src/
# Teste localmente
npm run dev
```

### 2. Testar no navegador
```
Abra: http://localhost:5173
```

### 3. Deploy na Vercel (automático)
```powershell
git add .
git commit -m "Descrição das mudanças"
git push origin main
# Vercel faz deploy automaticamente
```

### 4. Atualizar app Android
```powershell
npm run build
npx cap sync android
npx cap open android
# No Android Studio: Build > Build APK
```

### 5. Distribuir APK
```
Copie: android/app/build/outputs/apk/debug/app-debug.apk
Envie para os guardas via WhatsApp/Email
```

---

## 🆘 Comandos de Emergência

### App não abre no celular
```powershell
# 1. Limpar e rebuildar
npm run build
npx cap sync android

# 2. No Android Studio:
# Build > Clean Project
# Build > Rebuild Project
```

### Erro de permissões no Android
```powershell
# Verifique: android/app/src/main/AndroidManifest.xml
# Certifique-se que as permissões estão declaradas
```

### Erro de conexão com Supabase
```powershell
# Verifique o arquivo .env
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...

# Rebuilde após alterar .env
npm run build
```

### APK muito grande (> 100MB)
```powershell
# Gere APK de release com otimizações
cd android
.\gradlew assembleRelease
cd ..
```

---

## 📝 Notas Importantes

1. **Sempre faça backup antes de comandos destrutivos** (clean, remove, etc.)
2. **Teste no navegador antes de gerar APK** (mais rápido para debug)
3. **Use `npx cap sync` após mudanças no código web**
4. **Não commite o arquivo `.env`** (contém chaves secretas)
5. **APK debug é apenas para testes** (para produção, use release assinado)

---

## 🔗 Links Úteis

- **Documentação Capacitor:** https://capacitorjs.com/docs
- **Documentação Supabase:** https://supabase.com/docs
- **Documentação React:** https://react.dev/
- **Documentação Vite:** https://vitejs.dev/
- **Documentação Android:** https://developer.android.com/

---

**Última atualização:** 29/10/2025
