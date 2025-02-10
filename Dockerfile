# Use Debian-based Node image
FROM node:18-bullseye AS builder
WORKDIR /app

# Copy package.json and install
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build your Next.js app
RUN npm run build

# Production stage
FROM node:18-bullseye AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
