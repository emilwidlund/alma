FROM node:lts

WORKDIR /alma

COPY package.json ./package.json

COPY yarn.lock ./yarn.lock

COPY patches ./patches

COPY packages/alma-server ./packages/alma-server

RUN apt-get -qy update && apt-get -qy install openssl

RUN yarn

# Run and expose the server on port 3001
EXPOSE 3001

# A command to start the server
CMD yarn workspace alma-server run start:dev