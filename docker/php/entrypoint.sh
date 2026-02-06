#!/bin/sh

# 1. Entra na pasta
cd /var/www

# 2. Corrige as permissões (O comando que você vivia digitando)
# Ajusta o dono para www-data (usuário do PHP/Nginx)
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
# 3. Se a pasta vendor não existir, roda o install
if [ ! -d "/var/www/vendor" ]; then
    echo "Instalando dependências..."
    composer install --no-interaction --optimize-autoloader
fi

# 4. Garanta permissão nas pastas de escrita do Laravel
chmod -R 775 storage bootstrap/cache

# 5. Inicia o PHP-FPM (O comando original do container)
echo "Iniciando PHP-FPM..."
exec php-fpm