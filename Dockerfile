FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

COPY ca-key.pem /etc/ssl/certs/ca-key.pem

RUN npm run build

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "run", "start"]