FROM node:14-alpine

WORKDIR /app

COPY package*.json /app/

RUN yarn

COPY . /app

EXPOSE 3333

CMD ["yarn", "dev"]