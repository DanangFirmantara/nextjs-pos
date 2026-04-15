# ===============================
# Stage 1: Build
# ===============================
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ===============================
# Stage 2: Runtime
# ===============================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Buat user non-root untuk keamanan
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Salin hasil build standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]