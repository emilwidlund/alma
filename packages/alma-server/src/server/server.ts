import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { createApolloServer } from '../graphql/apollo';
import { initializePassport } from '../passport/auth';
import { buildHttpServer } from './http';
import { authToken } from './middlewares/authToken/authToken';
import { requestId } from './middlewares/requestId/requestId';
import { initializeSession } from './session';

/** Starts the Alma Server */
export const start = async (db: PrismaClient) => {
    const app = express();

    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true
        })
    );

    /** Parse Cookies */
    app.use(cookieParser());

    /** Initialize Session */
    initializeSession(app);

    /** Initialize Passport handlers */
    initializePassport(app, db);

    /** Assign unique identifier to each incoming request */
    app.use(requestId);

    /** Authenticate incoming request */
    app.use(authToken(db));

    /** Create HTTP Server */
    const httpServer = buildHttpServer(app);

    /** Create Apollo Server */
    createApolloServer(httpServer, app, db);

    httpServer.listen(process.env.PORT || 3001, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
};
