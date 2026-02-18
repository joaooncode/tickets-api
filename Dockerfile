# ---- Builder ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN --mount=type=cache,target=/app/.npm \
    npm set cache /app/.npm && \
    npm ci

RUN npx prisma generate

COPY . .
RUN npm run build


# ---- CLI Stage (migrations / seed) ----
FROM node:20-alpine AS cli
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY . .

RUN npm ci

# Não define CMD aqui — será definido pelo compose


# ---- Runner (produção) ----
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache curl \
    && addgroup -S nodejs \
    && adduser -S nextjs -G nodejs -u 1001

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static/
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

EXPOSE 3000
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["node", "server.js"]
