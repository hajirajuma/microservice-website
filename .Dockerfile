FROM node:22-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files from api-gateway
COPY api-gateway/package*.json ./

# Install dependencies
RUN npm install

# Copy api-gateway source code
COPY api-gateway/ .

# Generate Prisma client if used
RUN npx prisma generate || true

# Build application
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]