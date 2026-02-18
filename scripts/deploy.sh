#!/bin/bash

set -e

echo "🚀 Iniciando deploy do senac-helpdesk..."

# 1️⃣ Subir banco
echo "📦 Subindo banco..."
docker compose up -d db

# 2️⃣ Esperar banco ficar saudável
echo "⏳ Aguardando banco ficar saudável..."
until [ "$(docker inspect --format='{{.State.Health.Status}}' senac-helpdesk-db-1)" == "healthy" ]; do
  sleep 2
done

echo "✅ Banco pronto!"

# 3️⃣ Rodar migrations
echo "🗂 Rodando migrations..."
docker compose run --rm migration

# 4️⃣ Verificar se já existe tabela (indica que seed já rodou)
echo "🔎 Verificando se seed já foi executado..."

TABLE_CHECK=$(docker compose exec -T db psql -U postgres -d helpdesk -tAc "SELECT to_regclass('public.User');")

if [ "$TABLE_CHECK" = "" ]; then
  echo "🌱 Executando seed (primeiro deploy)..."
  docker compose run --rm seed
else
  echo "⏭ Seed já executado anteriormente. Pulando..."
fi

# 5️⃣ Subir aplicação
echo "🌐 Subindo aplicação..."
docker compose up -d app

echo "🎉 Deploy finalizado com sucesso!"
