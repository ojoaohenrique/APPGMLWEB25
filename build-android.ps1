# Script de Build Automático para Android
# Execute este script para fazer o build completo do app

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Build Android - Ajuda Laguna App" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Passo 1: Build da aplicação web
Write-Host "[1/3] Gerando build da aplicação web..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao gerar build da web!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build da web concluído!" -ForegroundColor Green
Write-Host ""

# Passo 2: Sincronizar com Android
Write-Host "[2/3] Sincronizando com projeto Android..." -ForegroundColor Yellow
npx cap sync android

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao sincronizar com Android!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Sincronização concluída!" -ForegroundColor Green
Write-Host ""

# Passo 3: Abrir no Android Studio
Write-Host "[3/3] Abrindo projeto no Android Studio..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  IMPORTANTE: No Android Studio, faça:" -ForegroundColor Magenta
Write-Host "   1. Aguarde o Gradle Sync terminar" -ForegroundColor White
Write-Host "   2. Menu: Build > Build Bundle(s) / APK(s) > Build APK(s)" -ForegroundColor White
Write-Host "   3. O APK estará em: android/app/build/outputs/apk/debug/" -ForegroundColor White
Write-Host ""

npx cap open android

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Build preparado com sucesso! 🎉" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
