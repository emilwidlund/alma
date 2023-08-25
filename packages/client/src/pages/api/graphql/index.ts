import { ApolloServer, gql } from 'apollo-server-micro';
import Cors from 'micro-cors';

const cors = Cors();

const typeDefs = gql`
    type Project {
        id: String
    }

    type Query {
        projects: [Project]!
    }
`;

const apolloServer = new ApolloServer({
    typeDefs
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
    await startServer;

    await apolloServer.createHandler({
        path: '/api/graphql'
    })(req, res);
});

export const config = {
    api: {
        bodyParser: false
    }
};
