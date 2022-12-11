FROM node:lts

WORKDIR /alma

# COPY package.json and package-lock.json files
COPY packages/alma-server/package*.json ./

# generated prisma files
COPY packages/alma-server/prisma ./packages/alma-server/prisma/

# COPY tsconfig.json file
COPY packages/alma-server/tsconfig.json ./packages/alma-server/

COPY packages/alma-server ./packages/alma-server

COPY package*.json ./

COPY lerna.json ./

COPY patches ./

RUN apt-get -qy update && apt-get -qy install openssl

RUN npm install

RUN npx lerna run db:generate

# Run and expose the server on port 3001
EXPOSE 3001

# A command to start the server
CMD npx lerna run start:dev