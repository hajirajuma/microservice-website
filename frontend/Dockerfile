FROM node:22-alpine

WORKDIR /app



COPY package*.json ./

RUN npm install

RUN printenv | grep NEXT_PUBLIC


COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]