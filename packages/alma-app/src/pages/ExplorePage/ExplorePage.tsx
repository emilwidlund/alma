import { useQuery } from '@apollo/client';
import * as React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import GET_USER_QUERY from '../../apollo/queries/getUser.gql';
import { Query } from '../../generated/graphql';
import { styles } from './ExplorePage.styles';
import { ExplorePageProps } from './ExplorePage.types';

export const ExplorePage = ({ navigation }: ExplorePageProps) => {
    useQuery<Query>(GET_USER_QUERY, {
        variables: { username: 'emilwidlund' },
        onError: console.error
    });

    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={[]} renderItem={({ index }) => <View key={index} />} snapToInterval={100} />
        </SafeAreaView>
    );
};
