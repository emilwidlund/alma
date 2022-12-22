import { useQuery } from '@apollo/client';
import { GLView } from 'expo-gl';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

import PROFILE_QUERY from '../../apollo/queries/profile.gql';
import { Project, Query } from '../../generated/graphql';
import { useArtboardContext } from '../../hooks/useArtboardContext/useArtboardContext';
import { ExplorePageProps } from './ExplorePage.types';

const CircuitView = ({
    project: { name, owner, circuit: serializedCircuit },
    scroll,
    index
}: {
    project: Project;
    scroll: Animated.Value;
    index: number;
}) => {
    const textContainerRef = React.useRef<View>(null);
    const { glRef, circuit, onContextCreate } = useArtboardContext(JSON.parse(JSON.stringify(serializedCircuit)));
    const { width, height } = Dimensions.get('window');

    const translation = scroll.interpolate({
        inputRange: [(index - 1) * height + height / 2, index * height, (index + 1) * height - height / 2],
        outputRange: [-200, 0, 200],
        extrapolate: 'clamp'
    });

    const opacity = scroll.interpolate({
        inputRange: [(index - 1) * height + height / 2, index * height, (index + 1) * height - height / 2],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp'
    });

    React.useEffect(() => {
        return () => {
            circuit?.dispose();
        };
    }, [circuit]);

    return (
        <>
            <GLView ref={glRef} style={[{ width, height }]} onContextCreate={onContextCreate} />
            <Animated.View
                ref={textContainerRef}
                style={[
                    StyleSheet.absoluteFill,
                    {
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        transform: [{ translateY: translation }],
                        opacity
                    }
                ]}
            >
                <LinearGradient
                    style={{ position: 'absolute', bottom: 0, height: height / 2, width: '100%' }}
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                />
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
            </Animated.View>
        </>
    );
};

export const ExplorePage = ({ navigation }: ExplorePageProps) => {
    const scroll = React.useRef(new Animated.Value(0)).current;
    const { data } = useQuery<Query>(PROFILE_QUERY, {
        variables: { username: 'emilwidlund' }
    });

    const { height } = Dimensions.get('window');

    return (
        <>
            <StatusBar style="light" />
            <Animated.FlatList
                data={data?.getUser?.projects}
                renderItem={({ item, index }: { item: Project; index: number }) => (
                    <CircuitView key={item.id} project={item} scroll={scroll} index={index} />
                )}
                snapToInterval={height}
                decelerationRate={0.9}
                initialNumToRender={1}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: scroll
                                }
                            }
                        }
                    ],
                    { useNativeDriver: true }
                )}
            />
        </>
    );
};
