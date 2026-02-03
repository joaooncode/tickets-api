# 1. Imagem Base
FROM php:8.4-fpm

# 2. Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Instala extensões do PHP necessárias para Laravel e Postgres
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

# 4. Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Define diretório de trabalho
WORKDIR /var/www

# 6. Copia os arquivos do projeto
COPY . .

# 7. CORREÇÃO DO ERRO: Cria a estrutura de pastas manualmente
# O "-p" garante que crie sem erro mesmo se já existir
RUN mkdir -p /var/www/storage/framework/sessions \
    && mkdir -p /var/www/storage/framework/views \
    && mkdir -p /var/www/storage/framework/cache \
    && mkdir -p /var/www/storage/logs \
    && mkdir -p /var/www/bootstrap/cache

# 8. Ajusta as permissões
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage \
    && chmod -R 775 /var/www/bootstrap/cache

# 9. Expõe a porta e inicia o PHP
EXPOSE 9000
CMD ["php-fpm"]
