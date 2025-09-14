# Dockerfile

# ---- Estágio 1: Build ----
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ---- Estágio 2: Produção ----
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/models ./models
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/config ./config
COPY --from=builder /app/.sequelizerc ./

EXPOSE 3000

CMD [ "npm", "run", "dev" ]