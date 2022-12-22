import { useQuery } from '@apollo/client';
import { GLView } from 'expo-gl';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';

import PROFILE_QUERY from '../../apollo/queries/profile.gql';
import { Project, Query } from '../../generated/graphql';
import { useArtboardContext } from '../../hooks/useArtboardContext/useArtboardContext';
import { ExplorePageProps } from './ExplorePage.types';

const CircuitView = ({ project: { name, owner, circuit: serializedCircuit } }: { project: Project }) => {
    const { glRef, circuit, onContextCreate } = useArtboardContext(JSON.parse(JSON.stringify(serializedCircuit)));
    const { width, height } = Dimensions.get('window');

    React.useEffect(() => {
        return () => {
            circuit?.dispose();
        };
    }, [circuit]);

    return (
        <>
            <GLView ref={glRef} style={[{ width, height }]} onContextCreate={onContextCreate} />
            <SafeAreaView
                style={[
                    StyleSheet.absoluteFill,
                    {
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }
                ]}
            >
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 26,
                        marginBottom: 12,
                        marginHorizontal: 32,
                        textAlign: 'center'
                    }}
                >
                    {name}
                </Text>

                <Text
                    style={{
                        color: 'rgba(255, 255, 255, .5)',
                        fontSize: 14,
                        textAlign: 'center',
                        marginBottom: 80,
                        marginHorizontal: 32
                    }}
                >
                    @{owner.username}
                </Text>
            </SafeAreaView>
        </>
    );
};

export const ExplorePage = ({ navigation }: ExplorePageProps) => {
    const { data } = useQuery<Query>(PROFILE_QUERY, {
        variables: { username: 'emilwidlund' }
    });

    const { height } = Dimensions.get('window');

    return (
        <>
            <StatusBar style="light" />
            <FlatList
                data={data?.getUser?.projects}
                renderItem={({ item }) => <CircuitView key={item.id} project={item} />}
                snapToInterval={height}
                decelerationRate={0.9}
                initialNumToRender={1}
                removeClippedSubviews={true}
            />
        </>
    );
};
