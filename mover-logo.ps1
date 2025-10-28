# Script para mover a nova logo
Copy-Item -Path "logo-guarda.png - Copia.jpeg" -Destination "public\logo-guarda.png" -Force
Remove-Item -Path "logo-guarda.png - Copia.jpeg" -Force
Write-Host "Logo movida com sucesso!"
