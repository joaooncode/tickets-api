# Stage 1: Build environment and Composer dependencies
FROM php:8.4.17-fpm-alpine3.23 AS builder

# Install system dependencies and PHP extensions for Laravel
RUN apk add --no-cache --virtual .build-deps \
    build-base \
    autoconf \
    pkgconfig \
    curl \
    unzip \
    postgresql-dev \
    oniguruma-dev \
    openssl-dev \
    libxml2-dev \
    curl-dev \
    icu-dev \
    libzip-dev \
    && docker-php-ext-install -j$(nproc) \
    pdo_pgsql \
    pgsql \
    opcache \
    intl \
    zip \
    bcmath \
    soap \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .build-deps \
    && rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

WORKDIR /var/www

# Copy application code
COPY . /var/www

# Install Composer and dependencies
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin \
    --filename=composer \
    && composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-progress \
    --prefer-dist

# ------------------------------------------------------------
# Stage 2: Production environment
# ------------------------------------------------------------
FROM php:8.4.17-fpm-alpine3.23 AS production

# Install only runtime libraries needed in production
RUN apk add --no-cache \
    curl \
    postgresql-libs \
    icu-libs \
    libzip \
    && rm -rf /var/cache/apk/*

# Copy entrypoint
COPY ./docker/php-fpm/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Copy initial storage structure
COPY ./storage /var/www/storage-init

# Copy PHP extensions and config from builder
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=builder /usr/local/bin/docker-php-ext-* /usr/local/bin/

# Use production php.ini
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Copy application code
COPY --from=builder /var/www /var/www

WORKDIR /var/www

# Permissions
RUN chown -R www-data:www-data /var/www

USER www-data

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

EXPOSE 9000

CMD ["php-fpm"]
