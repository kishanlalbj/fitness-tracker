FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY . .

RUN yarn

RUN sh ./build.sh

RUN pwd

EXPOSE 3000

ENV PORT=3000

CMD [ "yarn", "start" ]
