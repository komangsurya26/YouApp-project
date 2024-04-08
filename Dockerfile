FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install -g npm@10.5.1 && npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]