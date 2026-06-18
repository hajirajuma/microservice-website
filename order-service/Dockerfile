# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy source code
COPY . .

RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose service port
EXPOSE 3004

# Start the app
CMD ["npm", "run", "start:prod"]