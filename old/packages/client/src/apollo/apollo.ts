import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
    uri: '/api/graphql',
    credentials: 'include'
});

export const apolloClient = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});
