FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

COPY rds-ca.pem /etc/ssl/certs/rds-ca.pem

RUN npm run build

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "run", "start"]