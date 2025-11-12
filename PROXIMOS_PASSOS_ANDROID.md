# 📱 Próximos Passos - Aplicativo Android

## ✅ Status Atual
- ✅ Aplicação web deployada na Vercel
- ✅ Capacitor configurado (`capacitor.config.ts`)
- ✅ Pasta Android criada
- ⏳ Pendente: Build e testes do APK

---

## 🎯 PASSO 1: Testar o Aplicativo Web (Vercel)

### Checklist de Testes na Vercel

#### 🔐 Autenticação
- [ ] Cadastro público está bloqueado?
- [ ] Login funciona com usuário criado no Supabase?
- [ ] Logout funciona corretamente?
- [ ] Redirecionamento após login está correto?

#### 🎨 Usabilidade
- [ ] Sidebar abre e fecha no desktop?
- [ ] Botão do menu no cabeçalho funciona?
- [ ] Layout responsivo funciona em mobile (teste no navegador)?
- [ ] Todas as páginas carregam sem erro?

#### 📊 Dashboard
- [ ] Estatísticas (Total, Mês Atual) carregam?
- [ ] Botão "Consultar BNMP" abre o link externo?
- [ ] Cards de estatísticas mostram dados corretos?

#### 📝 CRUD de Cadastros
- [ ] **Criar**: Consegue criar novo cadastro?
  - [ ] Captura de GPS funciona?
  - [ ] Upload de foto funciona?
  - [ ] Campos obrigatórios validam?
  - [ ] Mensagem de sucesso aparece?
- [ ] **Ler**: Novo cadastro aparece na lista "Cadastrados"?
  - [ ] Detalhes do cadastro abrem corretamente?
  - [ ] Fotos são exibidas?
  - [ ] Localização GPS aparece?
- [ ] **Atualizar**: Botão "Editar" funciona?
  - [ ] Formulário abre preenchido com dados?
  - [ ] Consegue salvar edições?
  - [ ] Mudanças aparecem na lista?
- [ ] **Deletar**: Consegue excluir cadastro?
  - [ ] Confirmação de exclusão aparece?
  - [ ] Cadastro some da lista após exclusão?

---

## 🏗️ PASSO 2: Build da Aplicação Web

Execute estes comandos no terminal (PowerShell) na raiz do projeto:

```powershell
# 1. Certifique-se de estar na pasta correta
cd c:\Users\joaoh\Downloads\ajudalaguna-app-web01

# 2. Gere a build de produção
npm run build
```

**O que acontece:**
- Cria a pasta `dist/` com os arquivos otimizados
- Esta pasta será usada pelo Capacitor para o app Android

**Verificação:**
- [ ] Pasta `dist/` foi criada?
- [ ] Não houve erros no terminal?

---

## 🔄 PASSO 3: Sincronizar com Android

```powershell
# Sincroniza o código web com o projeto Android
npx cap sync android
```

**O que acontece:**
- Copia o conteúdo de `dist/` para `android/app/src/main/assets/public`
- Atualiza plugins nativos do Capacitor
- Prepara o projeto Android para build

**Verificação:**
- [ ] Comando executou sem erros?
- [ ] Mensagem de sucesso apareceu?

---

## 📦 PASSO 4: Gerar o APK

### Opção A: Via Android Studio (Recomendado)

```powershell
# Abre o projeto no Android Studio
npx cap open android
```

**No Android Studio:**
1. Aguarde o projeto carregar completamente (pode demorar 5-10 min na primeira vez)
2. Aguarde o Gradle Sync terminar (barra de progresso no rodapé)
3. Menu: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
4. Aguarde a compilação (pode demorar alguns minutos)
5. Clique em "locate" na notificação que aparecer
6. O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

**Verificação:**
- [ ] Android Studio abriu sem erros?
- [ ] Gradle Sync completou com sucesso?
- [ ] APK foi gerado?
- [ ] Tamanho do APK é razoável (10-50 MB)?

### Opção B: Via Linha de Comando (Alternativa)

```powershell
# Entre na pasta android
cd android

# Execute o build do Gradle
.\gradlew assembleDebug

# Volte para a raiz
cd ..
```

O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📱 PASSO 5: Testar o APK no Celular

### Instalação

1. **Copie o APK para o celular:**
   - Via cabo USB: copie `app-debug.apk` para a pasta Downloads do celular
   - Via WhatsApp/Email: envie o arquivo para você mesmo

2. **Instale no celular:**
   - Abra o arquivo no celular
   - Permita "Instalar de fontes desconhecidas" se solicitado
   - Clique em "Instalar"

### Checklist de Testes no Celular

#### 🔐 Autenticação
- [ ] App abre sem crash?
- [ ] Tela de login aparece?
- [ ] Consegue fazer login?
- [ ] Logout funciona?

#### 📍 Permissões e Funcionalidades Nativas

**GPS/Localização:**
- [ ] App solicita permissão de localização?
- [ ] Botão "Capturar Localização GPS" funciona?
- [ ] Coordenadas são capturadas corretamente?
- [ ] Teste em local diferente para verificar precisão

**Câmera/Galeria:**
- [ ] App solicita permissão de câmera?
- [ ] App solicita permissão de arquivos/galeria?
- [ ] Botão "Escolher Foto" abre opções?
- [ ] Consegue tirar foto com a câmera?
- [ ] Consegue selecionar foto da galeria?
- [ ] Foto é exibida após upload?

#### 📝 CRUD Completo no Mobile
- [ ] Criar cadastro funciona?
- [ ] Lista de cadastrados carrega?
- [ ] Detalhes do cadastro abrem?
- [ ] Editar cadastro funciona?
- [ ] Deletar cadastro funciona?

#### 🌐 Conectividade
- [ ] App funciona com WiFi?
- [ ] App funciona com dados móveis (4G/5G)?
- [ ] Mensagens de erro aparecem se não houver internet?

---

## 🎓 PASSO 6: Treinamento dos Usuários

### Preparação

1. **Crie usuários de teste no Supabase:**
   - Acesse: https://supabase.com/dashboard
   - Vá em Authentication → Users
   - Clique em "Add user" → "Create new user"
   - Crie pelo menos 3 usuários com cargos diferentes:
     - Comandante (cargo: comandante)
     - Guarda 1 (cargo: guarda)
     - Guarda 2 (cargo: guarda)

2. **Prepare material de treinamento:**
   - [ ] Lista de logins e senhas para distribuir
   - [ ] Prints das telas principais
   - [ ] Vídeo curto mostrando o fluxo completo (opcional)

### Roteiro de Treinamento (30-45 minutos)

#### Parte 1: Apresentação (5 min)
- Mostre o objetivo do sistema
- Explique os benefícios (rapidez, organização, acesso remoto)

#### Parte 2: Login e Navegação (10 min)
- Como fazer login
- Tour pela interface (sidebar, dashboard, menu)
- Como fazer logout

#### Parte 3: Criar Cadastro (15 min)
- Preencher formulário completo
- Capturar GPS (explique a importância)
- Tirar/escolher foto
- Salvar cadastro
- **Deixe cada guarda fazer um cadastro de teste**

#### Parte 4: Consultar e Editar (10 min)
- Como buscar cadastros na lista
- Ver detalhes
- Editar informações
- Excluir cadastro (com cuidado!)

#### Parte 5: Dúvidas e Feedback (10 min)
- Responda perguntas
- Anote sugestões e problemas

### Checklist de Feedback para Coletar

- [ ] Interface está clara e intuitiva?
- [ ] Algum botão está difícil de clicar?
- [ ] Falta algum campo importante?
- [ ] Alguma funcionalidade está confusa?
- [ ] Velocidade do app está boa?
- [ ] Algum erro ou bug encontrado?

---

## 🚀 PASSO 7: Melhorias Futuras (V1.1)

### Prioridade Alta
- [ ] **Modo Offline:** Salvar cadastros localmente quando sem internet
- [ ] **Busca Avançada:** Filtros por data, local, tipo de ocorrência
- [ ] **Relatórios:** Gerar PDFs com estatísticas mensais

### Prioridade Média
- [ ] **Notificações Push:** Alertas para novos cadastros
- [ ] **Backup Automático:** Exportar dados periodicamente
- [ ] **Múltiplas Fotos:** Permitir mais de uma foto por cadastro

### Prioridade Baixa
- [ ] **Modo Escuro:** Tema dark para uso noturno
- [ ] **Assinatura Digital:** Capturar assinatura do abordado
- [ ] **Publicação na Play Store:** App oficial no Google Play

---

## 🆘 Troubleshooting Comum

### Erro: "JAVA_HOME not set"
```powershell
# Instale o JDK 17 ou superior
# Baixe em: https://adoptium.net/
# Configure a variável de ambiente JAVA_HOME
```

### Erro: "Android SDK not found"
- Instale o Android Studio completo
- Abra o SDK Manager e instale Android SDK Platform 34

### APK não instala no celular
- Ative "Fontes desconhecidas" nas configurações
- Verifique se há espaço suficiente no celular
- Desinstale versões antigas do app antes

### GPS não funciona no app
- Verifique se a permissão foi concedida
- Teste em área aberta (GPS precisa de sinal de satélite)
- Reinicie o app após conceder permissão

### Fotos não aparecem
- Verifique as permissões de câmera/arquivos
- Confirme que o bucket do Supabase está público
- Teste com foto pequena primeiro (< 5MB)

---

## 📋 Checklist Final Antes do Lançamento

- [ ] Todos os testes web passaram
- [ ] APK foi gerado com sucesso
- [ ] Todos os testes mobile passaram
- [ ] Pelo menos 3 usuários testaram o app
- [ ] Feedback foi coletado e analisado
- [ ] Bugs críticos foram corrigidos
- [ ] Usuários foram treinados
- [ ] Documentação está atualizada
- [ ] Backup do banco de dados foi feito
- [ ] Plano de suporte está definido

---

## 📞 Próximos Comandos Rápidos

```powershell
# Build completo (web + android)
npm run build && npx cap sync android

# Abrir no Android Studio
npx cap open android

# Ver logs do app em tempo real (com celular conectado via USB)
npx cap run android

# Atualizar apenas o código web no app
npm run build && npx cap copy android
```

---

**Boa sorte com o lançamento! 🎉**
