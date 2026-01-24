# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Stage 2: Production server
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV HOST=0.0.0.0
ENV PORT=3004
ENV NUXT_PUBLIC_APP_API_URL=http://103.147.35.53:3005/
ENV NUXT_PUBLIC_APP_TIMEOUT=5000
ENV NUXT_API_URL=http://103.147.35.53:3005/
ENV NUXT_TIMEOUT=5000

EXPOSE 3004

CMD ["node", ".output/server/index.mjs"]
