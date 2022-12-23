import { from, ApolloClient, InMemoryCache } from '@apollo/client';

import { authLink } from './links/authLink/authLink';
import { httpLink } from './links/httpLink/httpLink';

export const apolloClient = new ApolloClient({
    uri: process.env.ALMA_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    link: from([authLink, httpLink]),
    credentials: 'include'
});
