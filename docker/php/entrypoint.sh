#!/bin/sh

# 1. Garante que estamos no diretório correto
cd /var/www

# 2. Cria as pastas de estrutura caso elas não existam (evita erros no chown)
mkdir -p storage/framework/sessions \
         storage/framework/views \
         storage/framework/cache \
         storage/logs \
         bootstrap/cache

# 3. Ajusta permissões apenas no necessário
# Usamos chown apenas no que o Laravel precisa escrever, preservando seu usuário Git
echo "Ajustando permissões de escrita..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# 4. Instala dependências se a pasta vendor sumir
if [ ! -d "/var/www/vendor" ]; then
    echo "Pasta vendor não encontrada. Instalando dependências..."
    composer install --no-interaction --optimize-autoloader
fi

# 5. Limpa caches para garantir que mudanças no .env (S3/Clerk) sejam lidas
php artisan config:clear
php artisan cache:clear

# 6. Inicia o PHP-FPM
echo "Ambiente pronto! Iniciando PHP-FPM..."
exec php-fpm
