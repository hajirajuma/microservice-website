FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache python3 make g++

RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start:prod"]