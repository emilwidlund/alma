import { from, ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

import { authLink } from './links/authLink/authLink';
import { httpLink } from './links/httpLink/httpLink';

export const apolloClient = new ApolloClient({
    uri: Constants.expoConfig?.extra?.ALMA_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    link: from([authLink, httpLink])
});
