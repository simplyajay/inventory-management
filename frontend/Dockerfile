# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Build the project
FROM node:22-alpine AS builder
WORKDIR /app
COPY . . 
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Stage 3: Production environment
FROM node:22-alpine AS runner
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["npm", "run", "dev"]