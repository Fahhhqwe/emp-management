FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 4000

ENV HOSTNAME=0.0.0.0

CMD [ "npm", "run", "dev" ]