FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

CMD ["npm", "run", "dev"]
