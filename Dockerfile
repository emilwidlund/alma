FROM node:lts

WORKDIR /alma

COPY packages/alma-server ./packages/alma-server

COPY package.json ./

COPY yarn.lock ./

COPY patches ./

RUN apt-get -qy update && apt-get -qy install openssl

RUN npm install yarn

RUN yarn

# Run and expose the server on port 3001
EXPOSE 3001

# A command to start the server
CMD yarn workspace alma-server run start:dev