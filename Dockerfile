############################
# 1️⃣ Builder stage
############################
FROM node:20-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# Copy dependency files first for cache
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Build Next.js
RUN npm run build


############################
# 2️⃣ Runner stage
############################
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080

# Copy only runtime essentials
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/utils ./utils

# Expose port matching server.ts (3000)
EXPOSE 8080

CMD ["npm", "run", "start"]
