FROM nginx:alpine

# Remove config default
RUN rm /etc/nginx/conf.d/default.conf

# Copia config do Nginx (API only)
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Apenas para path resolver (não serve arquivos)
WORKDIR /var/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
