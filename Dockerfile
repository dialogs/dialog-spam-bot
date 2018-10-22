FROM mhart/alpine-node:10

ENV NODE_ENV production

WORKDIR /opt/dialog-spam-bot

COPY lib lib
COPY package.json package.json

RUN npm install

ENTRYPOINT ["node", "lib/index.js"]
