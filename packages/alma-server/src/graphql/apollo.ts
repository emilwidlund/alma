import { PrismaClient } from '@prisma/client';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { Server } from 'http';
import { WebSocketServer } from 'ws';

import { IContext } from '../../types';
import { Route } from '../server/routes';
import { schema as buildSchema } from './schema';

export const createApolloServer = async (server: Server, app: express.Application, db: PrismaClient) => {
    const schema = await buildSchema;

    const websocketServer = new WebSocketServer({
        server: server,
        path: Route.GRAPHQL
    });

    const serverCleanup = useServer({ schema }, websocketServer);

    const apollo = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ApolloServerPluginDrainHttpServer({ httpServer: server }),
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
        context: ({ req, res }: { req: express.Request; res: express.Response }): IContext => ({
            requestId: req.id,
            db,
            user: req.user
        })
    });

    await apollo.start();

    apollo.applyMiddleware({ app });
};
