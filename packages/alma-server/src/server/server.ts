import { PrismaClient } from '@prisma/client';
import express from 'express';
import { expressjwt as jwt } from 'express-jwt';

import { createApolloServer } from '../graphql/apollo';
import { buildHttpsServer } from './https';
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
    app.use(
        jwt({
            secret: process.env.ALMA_JWT_SECRET,
            credentialsRequired: false,
            algorithms: ['HS256'],
            getToken: req => {
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    return req.headers.authorization.split(' ')[1];
                }
            }
        })
    );

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
