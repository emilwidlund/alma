import { PrismaClient } from '@prisma/client';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { IContext } from '../../types';
import { schema } from '../graphql/schema';
import { requestId } from './middlewares/requestId/requestId';
import { initializePassport, initializeSession } from './session';

/** Starts the Alma Server */
export const start = async (db: PrismaClient) => {
    const app = express();

    /** Initialize Passport handlers */
    initializePassport(db);

    /** Assign unique identifier to each incoming request */
    app.use(requestId);

    /** Initialize Session */
    initializeSession(app);

    const apollo = new ApolloServer({
        schema: await schema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
        context: ({ req, res }) => {
            const context: IContext = {
                requestId: req.id,
                db
            };
            return context;
        }
    });

    await apollo.start();

    apollo.applyMiddleware({ app });

    app.listen(3001, () => {
        console.log(`Server running on port ${3001}`);
    });
};
