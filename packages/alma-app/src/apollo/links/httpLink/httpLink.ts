import { createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

export const httpLink = createHttpLink({
    uri: Constants.expoConfig?.extra?.ALMA_GRAPHQL_ENDPOINT
});
