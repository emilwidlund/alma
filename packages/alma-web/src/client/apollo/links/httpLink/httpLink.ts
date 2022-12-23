import { createHttpLink } from '@apollo/client';

export const httpLink = createHttpLink({
    uri: process.env.ALMA_GRAPHQL_ENDPOINT,
    credentials: 'include'
});
