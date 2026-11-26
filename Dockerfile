FROM php:8.3-apache

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq-dev \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite headers \
    && sed -ri 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf \
    && echo 'ServerName localhost' > /etc/apache2/conf-available/servername.conf \
    && a2enconf servername

COPY . /var/www/html/

RUN rm -f /var/www/html/config/config.php \
    && chown -R www-data:www-data /var/www/html

CMD ["sh", "-c", "sed -ri \"s/Listen 80$/Listen ${PORT:-80}/\" /etc/apache2/ports.conf && sed -ri \"s/:80>/:${PORT:-80}>/\" /etc/apache2/sites-available/000-default.conf && exec apache2-foreground"]
