FROM node:22

WORKDIR /app

RUN rm -rf /path/to/temporary/files

COPY package*.json ./

RUN npm install
RUN npm install -g pm2

COPY . .

RUN npm run build

EXPOSE 7070

CMD ["pm2-runtime", "start", "server.js"]