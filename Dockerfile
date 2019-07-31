FROM node:lts-alpine

WORKDIR /opt/dialog-spam-bot

COPY lib lib
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --production && rm -rf package-lock.json

ENV NODE_ENV production
ENTRYPOINT ["npm", "start"]
