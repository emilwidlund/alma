FROM node:16

WORKDIR /alma

# COPY package.json and package-lock.json files
COPY packages/alma-server/package*.json ./

# generated prisma files
COPY packages/alma-server/prisma ./packages/alma-server/prisma/

# COPY tsconfig.json file
COPY packages/alma-server/tsconfig.json ./packages/alma-server/

COPY . .

RUN npm install

RUN npx lerna run db:generate

# Run and expose the server on port 3001
EXPOSE 3001

# A command to start the server
CMD npx lerna run start:dev