FROM node:10.15-alpine

ENV NODE_ENV production

WORKDIR /opt/dialog-spam-bot

COPY lib lib
COPY package.json package.json

RUN npm install

ENTRYPOINT ["node", "lib/index.js"]
