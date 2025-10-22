# Como Adicionar a Logo da Guarda Municipal

## Passo a Passo

### Opção 1: Copiar Manualmente

1. **Salve a imagem da logo** que você tem (o brasão da Guarda Municipal)
2. **Renomeie o arquivo** para: `logo-guarda.png`
3. **Copie o arquivo** para a pasta: `c:\Users\joaoh\Downloads\ajudalaguna-app-web01\public\`
4. **Substitua** o arquivo vazio que está lá
5. **Recarregue** o navegador (F5)

### Opção 2: Via Comando (PowerShell)

Se você tem a logo em algum lugar, execute:

```powershell
# Substitua "CAMINHO_DA_SUA_LOGO" pelo caminho real da imagem
Copy-Item "CAMINHO_DA_SUA_LOGO" -Destination "c:\Users\joaoh\Downloads\ajudalaguna-app-web01\public\logo-guarda.png" -Force
```

### Opção 3: Baixar da Internet

Se você tem a logo online:

1. Abra o navegador
2. Vá até a imagem da logo
3. Clique com botão direito → "Salvar imagem como..."
4. Salve como `logo-guarda.png` na pasta `public`

---

## Formatos Aceitos

- ✅ PNG (recomendado - com fundo transparente)
- ✅ JPG/JPEG
- ✅ SVG
- ✅ WebP

**Tamanho recomendado:** 512x512 pixels ou maior (será redimensionado automaticamente)

---

## Verificar se Funcionou

Após adicionar a logo:

1. Abra o navegador em `http://localhost:5173`
2. A logo deve aparecer no canto superior direito do Dashboard
3. A logo também aparece na página de Novo Cadastro

---

## Localização do Arquivo

**Caminho completo:**
```
c:\Users\joaoh\Downloads\ajudalaguna-app-web01\public\logo-guarda.png
```

**No código, é referenciada como:**
```html
<img src="/logo-guarda.png" alt="Logo Guarda Municipal" />
```

---

## Problemas Comuns

### Logo não aparece?
- Verifique se o arquivo está na pasta `public`
- Verifique se o nome está correto: `logo-guarda.png`
- Recarregue o navegador com Ctrl+F5 (força atualização)

### Logo aparece distorcida?
- O código usa `object-contain` para manter proporções
- Certifique-se de usar uma imagem de boa qualidade

---

**Precisa de ajuda?** Entre em contato com o desenvolvedor.
