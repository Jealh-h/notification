FROM node:16

# create app directory
WORKDIR /

# install appp dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3003

CMD ["node", "server.js"]