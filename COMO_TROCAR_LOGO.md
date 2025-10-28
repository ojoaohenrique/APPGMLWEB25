# 🎨 Como Trocar a Logo do Site

## 📍 Localização da Logo Atual

A logo está no arquivo:
```
public/logo-guarda.png
```

---

## 🔄 Como Trocar (2 Métodos)

### **Método 1: Substituir o Arquivo (Mais Fácil)**

1. **Prepare sua nova logo:**
   - Formato: PNG (com fundo transparente é melhor)
   - Tamanho recomendado: 200x200 pixels ou 300x300 pixels
   - Nome: Pode ser qualquer nome

2. **Substitua o arquivo:**
   - Vá até a pasta: `c:\Users\joaoh\Downloads\ajudalaguna-app-web01\public`
   - **Opção A**: Renomeie sua nova logo para `logo-guarda.png` e substitua o arquivo existente
   - **Opção B**: Adicione sua logo com outro nome (ex: `minha-logo.png`) e atualize o código

3. **Se usar Opção B, atualize o código:**
   - Abra: `src/pages/NovoCadastro.tsx`
   - Procure por: `logo-guarda.png`
   - Troque para: `minha-logo.png` (ou o nome que você escolheu)

4. **Envie para o Vercel:**
   ```bash
   git add .
   git commit -m "Atualiza logo"
   git push
   ```

---

### **Método 2: Usar Logo de URL Externa**

Se sua logo está hospedada em outro lugar (ex: Imgur, Google Drive público, etc.):

1. **Copie a URL da imagem**
   - Exemplo: `https://exemplo.com/minha-logo.png`

2. **Atualize o código:**
   - Abra: `src/pages/NovoCadastro.tsx`
   - Procure por: `src="/logo-guarda.png"`
   - Troque para: `src="https://exemplo.com/minha-logo.png"`

3. **Envie para o Vercel:**
   ```bash
   git add .
   git commit -m "Atualiza logo"
   git push
   ```

---

## 📂 Onde a Logo Aparece

A logo aparece em:
- ✅ Página de "Novo Cadastro" (canto superior direito)
- ✅ Página de "Editar Cadastro" (canto superior direito)

**Localização no código:**
- Arquivo: `src/pages/NovoCadastro.tsx`
- Linha aproximada: 454-460

```tsx
<img 
  src="/logo-guarda.png" 
  alt="Logo Guarda Municipal" 
  className="h-24 w-24 object-contain"
  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
/>
```

---

## 🎨 Recomendações para a Logo

### **Tamanho:**
- **Ideal**: 200x200 ou 300x300 pixels
- **Mínimo**: 100x100 pixels
- **Máximo**: 500x500 pixels

### **Formato:**
- **Melhor**: PNG com fundo transparente
- **Alternativa**: PNG com fundo branco
- **Evite**: JPG (não tem transparência)

### **Qualidade:**
- Alta resolução
- Bordas limpas
- Cores nítidas

---

## 🔧 Ajustar Tamanho da Logo (Opcional)

Se sua logo ficar muito grande ou pequena:

1. **Abra**: `src/pages/NovoCadastro.tsx`
2. **Procure**: `className="h-24 w-24 object-contain"`
3. **Ajuste o tamanho**:
   - `h-16 w-16` = Pequena (64x64px)
   - `h-20 w-20` = Média (80x80px)
   - `h-24 w-24` = Atual (96x96px)
   - `h-32 w-32` = Grande (128x128px)
   - `h-40 w-40` = Muito Grande (160x160px)

---

## 📝 Passo a Passo Completo (Método 1 - Recomendado)

### **1. Prepare a Nova Logo**
- Salve sua logo como PNG
- Tamanho: 200x200 ou 300x300 pixels
- Fundo transparente (se possível)

### **2. Substitua o Arquivo**
```
1. Vá em: c:\Users\joaoh\Downloads\ajudalaguna-app-web01\public
2. Encontre: logo-guarda.png
3. Delete ou renomeie o arquivo antigo
4. Cole sua nova logo
5. Renomeie para: logo-guarda.png
```

### **3. Teste Localmente (Opcional)**
```bash
npm run dev
```
- Abra: http://localhost:8080
- Vá em "Novo Cadastro"
- Veja se a logo aparece corretamente

### **4. Envie para o Vercel**
```bash
git add .
git commit -m "Atualiza logo"
git push
```

### **5. Aguarde Deploy (2-3 minutos)**
- Acesse: https://vercel.com/dashboard
- Aguarde status "Ready"
- Acesse seu site
- Veja a nova logo!

---

## 🎯 Exemplo Prático

### **Cenário: Você tem uma logo chamada "brasao-laguna.png"**

**Opção A - Renomear:**
```
1. Renomeie "brasao-laguna.png" para "logo-guarda.png"
2. Cole em: public/
3. Substitua o arquivo antigo
4. git add .
5. git commit -m "Atualiza logo"
6. git push
```

**Opção B - Manter nome original:**
```
1. Cole "brasao-laguna.png" em: public/
2. Abra: src/pages/NovoCadastro.tsx
3. Procure: src="/logo-guarda.png"
4. Troque para: src="/brasao-laguna.png"
5. Salve o arquivo
6. git add .
7. git commit -m "Atualiza logo"
8. git push
```

---

## 🖼️ Onde Encontrar Logos

### **Criar Logo:**
- **Canva**: https://www.canva.com (gratuito)
- **LogoMakr**: https://logomakr.com (gratuito)
- **Hatchful**: https://www.shopify.com/tools/logo-maker (gratuito)

### **Remover Fundo:**
- **Remove.bg**: https://www.remove.bg (gratuito)
- **Photopea**: https://www.photopea.com (gratuito, tipo Photoshop)

### **Redimensionar:**
- **TinyPNG**: https://tinypng.com (comprimir)
- **ResizeImage**: https://resizeimage.net (redimensionar)

---

## 🆘 Problemas Comuns

### **Logo não aparece:**
- ✅ Verifique se o arquivo está em `public/`
- ✅ Verifique o nome do arquivo (case-sensitive)
- ✅ Limpe o cache do navegador (Ctrl + Shift + Delete)
- ✅ Aguarde o deploy terminar no Vercel

### **Logo muito grande/pequena:**
- ✅ Ajuste `h-24 w-24` no código
- ✅ Ou redimensione a imagem original

### **Logo com fundo branco:**
- ✅ Use ferramenta para remover fundo (remove.bg)
- ✅ Salve como PNG com transparência

### **Logo pixelizada:**
- ✅ Use imagem de maior resolução
- ✅ Mínimo 200x200 pixels

---

## 📋 Checklist

Antes de enviar:
- [ ] Nova logo preparada (PNG, tamanho adequado)
- [ ] Arquivo colocado em `public/`
- [ ] Nome correto ou código atualizado
- [ ] Testado localmente (opcional)
- [ ] Commit e push feitos
- [ ] Deploy no Vercel aguardado
- [ ] Site verificado

---

## 🎨 Dica Extra: Logo no Favicon

Para trocar o ícone que aparece na aba do navegador:

1. **Crie um favicon:**
   - Tamanho: 32x32 ou 64x64 pixels
   - Formato: ICO ou PNG
   - Nome: `favicon.ico` ou `favicon.png`

2. **Coloque em**: `public/`

3. **Atualize** (se necessário): `index.html`

---

**Pronto! Agora você sabe trocar a logo do site!** 🎉

**Qualquer dúvida, me avise!**
