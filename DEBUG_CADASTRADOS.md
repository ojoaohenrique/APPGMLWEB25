# Debug - Página Cadastrados Preta

## 🔍 Problema
A página `/cadastrados` aparece completamente preta no navegador.

## 🛠️ Possíveis Causas e Soluções

### 1. Servidor não está rodando
**Verificar**:
```bash
# Certifique-se de que o servidor está rodando
npm run dev
```

**Deve aparecer**:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### 2. Erro de JavaScript no Console
**Verificar**:
1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Procure por erros em vermelho

**Erros comuns**:
- `Cannot find module` - Dependências não instaladas
- `Supabase error` - Problema de conexão com banco
- `Auth error` - Problema de autenticação

**Solução**:
```bash
# Reinstalar dependências
npm install
```

### 3. Problema de Autenticação
**Sintoma**: Página redireciona ou fica preta

**Solução**:
1. Faça logout e login novamente
2. Verifique se o `.env` tem as variáveis corretas:
```env
VITE_SUPABASE_URL=sua_url
VITE_SUPABASE_ANON_KEY=sua_chave
```

### 4. Erro no Supabase
**Verificar**:
- Tabela `moradores` existe?
- Políticas RLS configuradas?
- Conexão com internet OK?

**Teste no console do navegador**:
```javascript
// Cole isso no console (F12)
const { data, error } = await supabase.from('moradores').select('*');
console.log('Data:', data);
console.log('Error:', error);
```

### 5. CSS não carregado
**Verificar**:
1. Inspecione elemento (F12)
2. Vá em "Elements"
3. Verifique se há classes Tailwind aplicadas

**Se não houver classes**:
```bash
# Limpar cache e reconstruir
rm -rf node_modules .vite dist
npm install
npm run dev
```

## 🔧 Passos para Debug

### Passo 1: Verificar Console
```bash
# Abra o navegador em http://localhost:5173/cadastrados
# Pressione F12
# Vá em Console
# Copie TODOS os erros que aparecerem
```

### Passo 2: Verificar Network
```bash
# No DevTools, vá em "Network"
# Recarregue a página (F5)
# Veja se há requisições falhando (em vermelho)
```

### Passo 3: Testar Componente Isolado
Crie um arquivo de teste:

```typescript
// src/pages/TesteCadastrados.tsx
import { AppLayout } from "@/components/layout/AppLayout";

const TesteCadastrados = () => {
  return (
    <AppLayout>
      <div className="bg-white text-black p-8">
        <h1 className="text-4xl">TESTE - Se você vê isso, o layout funciona!</h1>
        <p>Background: white</p>
        <p>Text: black</p>
      </div>
    </AppLayout>
  );
};

export default TesteCadastrados;
```

Adicione rota em `App.tsx`:
```typescript
<Route path="/teste" element={<TesteCadastrados />} />
```

Acesse: `http://localhost:5173/teste`

### Passo 4: Verificar Dependências
```bash
# Verificar se todas as dependências estão instaladas
npm list @tanstack/react-query
npm list @supabase/supabase-js
npm list lucide-react
```

## 🚨 Solução Rápida

Se nada funcionar, tente:

```bash
# 1. Parar o servidor (Ctrl+C)

# 2. Limpar tudo
rm -rf node_modules
rm -rf .vite
rm -rf dist
rm package-lock.json

# 3. Reinstalar
npm install

# 4. Iniciar novamente
npm run dev
```

## 📋 Checklist de Verificação

- [ ] Servidor `npm run dev` está rodando?
- [ ] Console do navegador sem erros?
- [ ] Arquivo `.env` existe e está correto?
- [ ] Dependências instaladas (`node_modules` existe)?
- [ ] Supabase configurado corretamente?
- [ ] Usuário está logado?
- [ ] Internet funcionando?

## 🎯 Próximos Passos

1. **Abra o console do navegador (F12)**
2. **Copie TODOS os erros que aparecerem**
3. **Me envie os erros para eu poder ajudar melhor**

## 💡 Dica

A página foi melhorada com:
- ✅ Verificação de autenticação
- ✅ Tratamento de erros
- ✅ Mensagens de erro amigáveis
- ✅ Botão "Tentar Novamente"

Se houver erro, agora você verá uma mensagem ao invés de tela preta!
