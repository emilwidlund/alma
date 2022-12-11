import { PrismaClient } from '@prisma/client';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';

import { createServer } from 'http';

import { IContext } from '../../types';
import { schema as buildSchema } from '../graphql/schema';
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

    /** Create HTTPS Server */
    const httpsServer = createServer(app);

    const schema = await buildSchema;

    const websocketServer = new WebSocketServer({
        server: httpsServer,
        path: '/graphql'
    });

    // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    const serverCleanup = useServer({ schema }, websocketServer);

    const apollo = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ApolloServerPluginDrainHttpServer({ httpServer: httpsServer }), // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    };
                }
            }
        ],
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

    httpsServer.listen(3001, () => {
        console.log(`Server running on port ${3001}`);
    });
};
