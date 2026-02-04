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

# 3. Instala extensões do PHP
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

# 4. Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Define diretório de trabalho
WORKDIR /var/www

# 6. Copia os arquivos do projeto (para a imagem de produção)
COPY . .

# 7. Configuração do Entrypoint
# Copia o script para uma pasta do sistema (fora do volume /var/www para garantir que existe)
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh

# Dá permissão de execução
RUN chmod +x /usr/local/bin/entrypoint.sh

# 8. Cria as pastas necessárias (Separado linha por linha para evitar erros de shell)
RUN mkdir -p /var/www/storage/framework/sessions \
    && mkdir -p /var/www/storage/framework/views \
    && mkdir -p /var/www/storage/framework/cache \
    && mkdir -p /var/www/storage/logs \
    && mkdir -p /var/www/bootstrap/cache

# 9. Define o Entrypoint e o comando padrão
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]