# syntax=docker.io/docker/dockerfile:1

# ---- Base for Build Stage ----
FROM node:20-bullseye AS builder-base
WORKDIR /app

# Install dependencies for building (Debian has glibc, works with lightningcss)
COPY package*.json ./

# Cache npm modules
RUN --mount=type=cache,target=/app/.npm \
    npm set cache /app/.npm && \
    npm ci

# Copy source code
COPY . .

# Next.js build
# Disable telemetry if you want
# ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Runner Stage (Alpine) ----
FROM node:20-alpine AS runner
WORKDIR /app

# Install curl and Create non-root user
RUN apk add --no-cache curl \
    && addgroup -S nodejs \
    && adduser -S nextjs -G nodejs -u 1001

USER nextjs

# Copy only the production output from builder
COPY --from=builder-base --chown=nextjs:nodejs /app/.next/standalone ./ 
COPY --from=builder-base --chown=nextjs:nodejs /app/.next/static ./.next/static/
COPY --from=builder-base --chown=nextjs:nodejs /app/public ./public

# Expose port and run
EXPOSE 3000

ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["node", "server.js"]
