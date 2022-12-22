import { useQuery } from '@apollo/client';
import * as React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

import PROFILE_QUERY from '../../apollo/queries/profile.gql';
import { ProjectListContainer } from '../../containers/ProjectList/ProjectList';
import { Query } from '../../generated/graphql';
import { styles } from './ProfilePage.styles';
import { ProfilePageProps } from './ProfilePage.types';

export const ProfilePage = ({ navigation }: ProfilePageProps) => {
    const { data } = useQuery<Query>(PROFILE_QUERY, {
        variables: { username: 'emilwidlund' }
    });

    return (
        <SafeAreaView style={styles.container}>
            <ProjectListContainer
                header={
                    <View>
                        <View
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: '#fff',
                                borderRadius: 50,
                                shadowRadius: 10,
                                shadowOpacity: 0.15,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 0 }
                            }}
                        >
                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    borderWidth: 2,
                                    borderColor: '#fff'
                                }}
                                source={{
                                    uri: data?.getUser?.mediaUrl
                                }}
                            />
                        </View>
                        <Text style={{ fontSize: 32, marginTop: 30 }}>{data?.getUser?.name}</Text>
                        <Text style={{ fontSize: 18, marginTop: 12, fontWeight: '500' }}>
                            @{data?.getUser?.username}
                        </Text>
                        <Text style={{ fontSize: 18, marginTop: 20, lineHeight: 26 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae mattis diam, at
                            efficitur magna. Suspendisse hendrerit turpis diam.
                        </Text>
                    </View>
                }
                projects={data?.getUser?.projects || []}
            />
        </SafeAreaView>
    );
};
