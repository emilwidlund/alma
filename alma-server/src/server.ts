import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from 'express';
import { requestId } from './middlewares/requestId/requestId';

/** Starts the Alma Server */
export const start = () => {
    const app = express();

    /** Assign unique identifier to each incoming request */
    app.use(requestId);

    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
        context: ({ req, res }) => ({
            id: req.id
        })
    });

    apollo.applyMiddleware({ app });
};
