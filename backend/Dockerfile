#  Use Node.js
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]