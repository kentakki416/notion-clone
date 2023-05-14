FROM node:16-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY *.json ./
RUN npm ci

COPY . .

EXPOSE 8080
CMD [ "npm", "start"]
