# 1. Etapa de Dependencias: Instalar dependencias
FROM node:18-alpine AS deps
WORKDIR /app

# Copiar package.json y lockfile
COPY package.json package-lock.json ./

# Instalar dependencias de producción
RUN npm install --omit=dev --legacy-peer-deps

# 2. Etapa de Build: Construir la aplicación
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar dependencias de la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Construir la aplicación
RUN npm run build

# 3. Etapa Final: Ejecución
FROM node:18-alpine AS runner
WORKDIR /app

# Variables de entorno para producción
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Copiar artefactos de la etapa de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto en el que corre la app
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
