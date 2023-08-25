import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache()
});
