# ✅ Checklist de Testes - Ajuda Laguna App

## 📅 Data do Teste: ___/___/2025
## 👤 Testador: _______________________

---

## 🌐 TESTES WEB (Vercel)

### URL de Teste: https://seu-app.vercel.app

### 🔐 Autenticação

| Teste | Status | Observações |
|-------|--------|-------------|
| Página de login carrega | ⬜ OK ⬜ ERRO | |
| Cadastro público está bloqueado | ⬜ OK ⬜ ERRO | |
| Login com credenciais válidas funciona | ⬜ OK ⬜ ERRO | |
| Login com credenciais inválidas mostra erro | ⬜ OK ⬜ ERRO | |
| Redirecionamento após login está correto | ⬜ OK ⬜ ERRO | |
| Logout funciona | ⬜ OK ⬜ ERRO | |
| Sessão persiste ao recarregar página | ⬜ OK ⬜ ERRO | |

### 🎨 Interface e Navegação

| Teste | Status | Observações |
|-------|--------|-------------|
| Logo da Guarda aparece corretamente | ⬜ OK ⬜ ERRO | |
| Sidebar abre e fecha no desktop | ⬜ OK ⬜ ERRO | |
| Menu hambúrguer funciona no mobile | ⬜ OK ⬜ ERRO | |
| Todas as páginas do menu são acessíveis | ⬜ OK ⬜ ERRO | |
| Layout responsivo funciona (teste em várias telas) | ⬜ OK ⬜ ERRO | |
| Cores e estilos estão consistentes | ⬜ OK ⬜ ERRO | |

### 📊 Dashboard

| Teste | Status | Observações |
|-------|--------|-------------|
| Estatística "Total de Cadastros" carrega | ⬜ OK ⬜ ERRO | |
| Estatística "Cadastros do Mês" carrega | ⬜ OK ⬜ ERRO | |
| Números estão corretos | ⬜ OK ⬜ ERRO | |
| Botão "Consultar BNMP" abre link externo | ⬜ OK ⬜ ERRO | |
| Cards de estatísticas são clicáveis (se aplicável) | ⬜ OK ⬜ ERRO | |

### ➕ Criar Novo Cadastro

| Teste | Status | Observações |
|-------|--------|-------------|
| Página "Novo Cadastro" abre | ⬜ OK ⬜ ERRO | |
| Todos os campos aparecem corretamente | ⬜ OK ⬜ ERRO | |
| Validação de campos obrigatórios funciona | ⬜ OK ⬜ ERRO | |
| Botão "Capturar Localização GPS" funciona | ⬜ OK ⬜ ERRO | |
| Coordenadas GPS são exibidas após captura | ⬜ OK ⬜ ERRO | |
| Botão "Escolher Foto" abre seletor de arquivos | ⬜ OK ⬜ ERRO | |
| Preview da foto aparece após seleção | ⬜ OK ⬜ ERRO | |
| Upload de foto funciona | ⬜ OK ⬜ ERRO | |
| Formulário salva com sucesso | ⬜ OK ⬜ ERRO | |
| Mensagem de sucesso aparece | ⬜ OK ⬜ ERRO | |
| Redirecionamento após salvar está correto | ⬜ OK ⬜ ERRO | |

### 📋 Listar Cadastrados

| Teste | Status | Observações |
|-------|--------|-------------|
| Página "Cadastrados" abre | ⬜ OK ⬜ ERRO | |
| Lista de cadastros carrega | ⬜ OK ⬜ ERRO | |
| Cadastros aparecem ordenados corretamente | ⬜ OK ⬜ ERRO | |
| Informações básicas estão visíveis nos cards | ⬜ OK ⬜ ERRO | |
| Fotos aparecem nos cards (se houver) | ⬜ OK ⬜ ERRO | |
| Busca/filtro funciona (se houver) | ⬜ OK ⬜ ERRO | |
| Paginação funciona (se houver) | ⬜ OK ⬜ ERRO | |

### 👁️ Ver Detalhes do Cadastro

| Teste | Status | Observações |
|-------|--------|-------------|
| Clicar em cadastro abre detalhes | ⬜ OK ⬜ ERRO | |
| Todas as informações aparecem | ⬜ OK ⬜ ERRO | |
| Foto é exibida em tamanho maior | ⬜ OK ⬜ ERRO | |
| Localização GPS é exibida | ⬜ OK ⬜ ERRO | |
| Data/hora de criação aparece | ⬜ OK ⬜ ERRO | |
| Botões de ação (Editar, Excluir) aparecem | ⬜ OK ⬜ ERRO | |

### ✏️ Editar Cadastro

| Teste | Status | Observações |
|-------|--------|-------------|
| Botão "Editar" abre formulário | ⬜ OK ⬜ ERRO | |
| Formulário vem preenchido com dados atuais | ⬜ OK ⬜ ERRO | |
| Consegue alterar campos de texto | ⬜ OK ⬜ ERRO | |
| Consegue alterar foto | ⬜ OK ⬜ ERRO | |
| Consegue atualizar GPS | ⬜ OK ⬜ ERRO | |
| Salvar edição funciona | ⬜ OK ⬜ ERRO | |
| Mudanças aparecem nos detalhes | ⬜ OK ⬜ ERRO | |
| Mudanças aparecem na lista | ⬜ OK ⬜ ERRO | |

### 🗑️ Excluir Cadastro

| Teste | Status | Observações |
|-------|--------|-------------|
| Botão "Excluir" aparece | ⬜ OK ⬜ ERRO | |
| Confirmação de exclusão aparece | ⬜ OK ⬜ ERRO | |
| Cancelar exclusão funciona | ⬜ OK ⬜ ERRO | |
| Confirmar exclusão remove o cadastro | ⬜ OK ⬜ ERRO | |
| Cadastro some da lista | ⬜ OK ⬜ ERRO | |
| Foto é removida do storage | ⬜ OK ⬜ ERRO | |

---

## 📱 TESTES MOBILE (APK Android)

### 📦 Instalação

| Teste | Status | Observações |
|-------|--------|-------------|
| APK foi gerado com sucesso | ⬜ OK ⬜ ERRO | |
| Tamanho do APK é razoável (< 50MB) | ⬜ OK ⬜ ERRO | |
| APK instala no celular sem erros | ⬜ OK ⬜ ERRO | |
| Ícone do app aparece na tela inicial | ⬜ OK ⬜ ERRO | |
| Nome do app está correto ("Ajuda Laguna") | ⬜ OK ⬜ ERRO | |

### 🚀 Inicialização

| Teste | Status | Observações |
|-------|--------|-------------|
| App abre sem crash | ⬜ OK ⬜ ERRO | |
| Splash screen aparece (se houver) | ⬜ OK ⬜ ERRO | |
| Tela de login carrega | ⬜ OK ⬜ ERRO | |
| Tempo de carregamento é aceitável (< 5s) | ⬜ OK ⬜ ERRO | |

### 🔐 Autenticação Mobile

| Teste | Status | Observações |
|-------|--------|-------------|
| Login funciona com WiFi | ⬜ OK ⬜ ERRO | |
| Login funciona com dados móveis (4G/5G) | ⬜ OK ⬜ ERRO | |
| Teclado aparece corretamente nos campos | ⬜ OK ⬜ ERRO | |
| Botão "Mostrar/Ocultar senha" funciona | ⬜ OK ⬜ ERRO | |
| Logout funciona | ⬜ OK ⬜ ERRO | |

### 📍 Permissões - GPS/Localização

| Teste | Status | Observações |
|-------|--------|-------------|
| App solicita permissão de localização | ⬜ OK ⬜ ERRO | |
| Permissão pode ser concedida | ⬜ OK ⬜ ERRO | |
| Botão "Capturar GPS" funciona após permissão | ⬜ OK ⬜ ERRO | |
| Coordenadas são capturadas corretamente | ⬜ OK ⬜ ERRO | |
| GPS funciona em área aberta | ⬜ OK ⬜ ERRO | |
| Mensagem de erro aparece se GPS desligado | ⬜ OK ⬜ ERRO | |
| Precisão do GPS é aceitável (< 20m) | ⬜ OK ⬜ ERRO | |

**Teste de GPS:**
- Localização capturada: Lat: __________ Long: __________
- Localização real (Google Maps): Lat: __________ Long: __________
- Diferença: __________ metros

### 📷 Permissões - Câmera/Galeria

| Teste | Status | Observações |
|-------|--------|-------------|
| App solicita permissão de câmera | ⬜ OK ⬜ ERRO | |
| App solicita permissão de arquivos/galeria | ⬜ OK ⬜ ERRO | |
| Permissões podem ser concedidas | ⬜ OK ⬜ ERRO | |
| Botão "Escolher Foto" abre opções | ⬜ OK ⬜ ERRO | |
| Opção "Tirar Foto" funciona | ⬜ OK ⬜ ERRO | |
| Opção "Escolher da Galeria" funciona | ⬜ OK ⬜ ERRO | |
| Preview da foto aparece após seleção | ⬜ OK ⬜ ERRO | |
| Upload da foto funciona | ⬜ OK ⬜ ERRO | |
| Foto aparece nos detalhes do cadastro | ⬜ OK ⬜ ERRO | |

### 📝 CRUD Completo no Mobile

| Teste | Status | Observações |
|-------|--------|-------------|
| Criar novo cadastro funciona | ⬜ OK ⬜ ERRO | |
| Lista de cadastrados carrega | ⬜ OK ⬜ ERRO | |
| Scroll da lista funciona suavemente | ⬜ OK ⬜ ERRO | |
| Detalhes do cadastro abrem | ⬜ OK ⬜ ERRO | |
| Editar cadastro funciona | ⬜ OK ⬜ ERRO | |
| Excluir cadastro funciona | ⬜ OK ⬜ ERRO | |

### 🎨 Interface Mobile

| Teste | Status | Observações |
|-------|--------|-------------|
| Layout se adapta ao tamanho da tela | ⬜ OK ⬜ ERRO | |
| Botões são fáceis de clicar (tamanho adequado) | ⬜ OK ⬜ ERRO | |
| Textos são legíveis | ⬜ OK ⬜ ERRO | |
| Cores estão corretas | ⬜ OK ⬜ ERRO | |
| Imagens carregam corretamente | ⬜ OK ⬜ ERRO | |
| Animações são suaves | ⬜ OK ⬜ ERRO | |
| Não há elementos cortados ou sobrepostos | ⬜ OK ⬜ ERRO | |

### 🌐 Conectividade

| Teste | Status | Observações |
|-------|--------|-------------|
| App funciona com WiFi | ⬜ OK ⬜ ERRO | |
| App funciona com 4G/5G | ⬜ OK ⬜ ERRO | |
| Mensagem de erro aparece sem internet | ⬜ OK ⬜ ERRO | |
| App não crasha ao perder conexão | ⬜ OK ⬜ ERRO | |
| App reconecta automaticamente | ⬜ OK ⬜ ERRO | |

### ⚡ Performance

| Teste | Status | Observações |
|-------|--------|-------------|
| App abre rapidamente (< 5s) | ⬜ OK ⬜ ERRO | |
| Navegação entre telas é fluida | ⬜ OK ⬜ ERRO | |
| Carregamento de imagens é rápido | ⬜ OK ⬜ ERRO | |
| App não trava durante uso | ⬜ OK ⬜ ERRO | |
| Bateria não drena excessivamente | ⬜ OK ⬜ ERRO | |
| App não esquenta o celular | ⬜ OK ⬜ ERRO | |

### 🔄 Testes de Estresse

| Teste | Status | Observações |
|-------|--------|-------------|
| Criar 10 cadastros seguidos funciona | ⬜ OK ⬜ ERRO | |
| Scroll em lista com 50+ cadastros é suave | ⬜ OK ⬜ ERRO | |
| Upload de foto grande (5MB) funciona | ⬜ OK ⬜ ERRO | |
| App funciona após ficar em background | ⬜ OK ⬜ ERRO | |
| App funciona após reiniciar o celular | ⬜ OK ⬜ ERRO | |

---

## 🐛 BUGS ENCONTRADOS

### Bug #1
- **Descrição:** _______________________________________
- **Como reproduzir:** _________________________________
- **Severidade:** ⬜ Crítico ⬜ Alto ⬜ Médio ⬜ Baixo
- **Plataforma:** ⬜ Web ⬜ Android

### Bug #2
- **Descrição:** _______________________________________
- **Como reproduzir:** _________________________________
- **Severidade:** ⬜ Crítico ⬜ Alto ⬜ Médio ⬜ Baixo
- **Plataforma:** ⬜ Web ⬜ Android

### Bug #3
- **Descrição:** _______________________________________
- **Como reproduzir:** _________________________________
- **Severidade:** ⬜ Crítico ⬜ Alto ⬜ Médio ⬜ Baixo
- **Plataforma:** ⬜ Web ⬜ Android

---

## 💡 SUGESTÕES DE MELHORIA

1. _________________________________________________
2. _________________________________________________
3. _________________________________________________
4. _________________________________________________
5. _________________________________________________

---

## 📊 RESUMO DO TESTE

- **Total de testes:** _______
- **Testes OK:** _______
- **Testes com erro:** _______
- **Taxa de sucesso:** _______%

### Conclusão:
⬜ Aprovado para produção
⬜ Aprovado com ressalvas
⬜ Necessita correções

### Observações finais:
_____________________________________________________
_____________________________________________________
_____________________________________________________

---

**Assinatura do Testador:** _______________________
**Data:** ___/___/2025
