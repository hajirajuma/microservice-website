FROM node:22-alpine

WORKDIR /app



COPY package*.json ./

RUN npm install

RUN echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL"


COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]