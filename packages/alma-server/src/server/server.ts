import { PrismaClient } from '@prisma/client';
import express from 'express';

import { createApolloServer } from '../graphql/apollo';
import { buildHttpsServer } from './https';
import { authToken } from './middlewares/authToken/authToken';
import { requestId } from './middlewares/requestId/requestId';
import { initializePassport, initializeSession } from './session';

/** Starts the Alma Server */
export const start = async (db: PrismaClient) => {
    const app = express();

    /** Initialize Passport handlers */
    initializePassport(db);

    /** Assign unique identifier to each incoming request */
    app.use(requestId);

    /** Authenticate incoming request */
    app.use(authToken(db));

    /** Initialize Session */
    initializeSession(app);

    /** Create HTTPS Server */
    const httpsServer = buildHttpsServer(app);

    /** Create Apollo Server */
    createApolloServer(httpsServer, app, db);

    httpsServer.listen(3001, () => {
        console.log(`Server running on port ${3001}`);
    });
};
