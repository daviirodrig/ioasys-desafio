FROM node:16

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENTRYPOINT [ "yarn", "start" ]