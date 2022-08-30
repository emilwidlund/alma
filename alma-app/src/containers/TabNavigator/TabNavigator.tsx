import React, { useCallback, useRef, useState } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
    Animated,
    Dimensions,
    Easing,
    GestureResponderEvent,
    PanResponder,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './TabNavigator.styles';
import { ITabNavigatorItemProps } from './TabNavigator.types';
import { Route } from '@react-navigation/native';
import { ArtboardPage } from '../../pages/ArtboardPage/ArtboardPage';
import { VERTEX as vertexShaderSource, FRAGMENT as fragmentShaderSource } from '../../shaders/camera';

const TabNavigatorItem = ({ navigation, route, active, icon, onPress }: ITabNavigatorItemProps) => {
    const routePressHandler = useCallback(
        (e: GestureResponderEvent) => {
            navigation.navigate(route.name);

            onPress?.(e);
        },
        [navigation, route]
    );

    return (
        <TouchableOpacity key={route.key} style={styles.itemContainer} onPress={routePressHandler}>
            {/** @ts-ignore */}
            <MaterialIcons name={icon} size={24} color={active ? '#000' : '#ccc'} />
        </TouchableOpacity>
    );
};

export const TabNavigator = ({ navigation, state }: BottomTabBarProps) => {
    const ref = useRef<View>(null);
    const animatedHeight = useRef(new Animated.Value(76)).current;
    const [navigatorMode, setNavigatorMode] = useState(true);

    const { height } = Dimensions.get('screen');

    const panResponder = React.useRef(
        PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!
                // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}

                animatedHeight.setValue(height - 100 - gestureState.dy);

                return true;
            },
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded

                if (gestureState.vy > 0) {
                    Animated.spring(animatedHeight, {
                        toValue: 76,
                        useNativeDriver: false
                    }).start();

                    setNavigatorMode(true);
                } else {
                    Animated.spring(animatedHeight, {
                        toValue: height - 100,
                        useNativeDriver: false
                    }).start();
                }
            }
        })
    ).current;

    const expand = useCallback(() => {
        const { height } = Dimensions.get('screen');

        Animated.spring(animatedHeight, {
            toValue: height - 100,
            useNativeDriver: false
        }).start();

        setNavigatorMode(false);
    }, []);

    const navigatorIcon = useCallback((route: Route<any>) => {
        switch (route.name) {
            case 'ProjectStack':
                return 'stream';
            default:
                return 'face';
        }
    }, []);

    const renderRoute = useCallback(
        (route: Route<any>, index: number) => {
            return (
                <TabNavigatorItem
                    key={route.key}
                    route={route}
                    active={state.index === index}
                    navigation={navigation}
                    icon={navigatorIcon(route)}
                />
            );
        },
        [state]
    );

    const renderRoutes = useCallback(
        (routes: Route<any>[]) => {
            const midIndex = Math.floor(routes.length / 2);
            const firstHalf = routes.slice(0, midIndex);
            const lastHalf = routes.slice(midIndex);

            return (
                <>
                    {firstHalf.map(renderRoute)}
                    <TouchableOpacity style={{ ...styles.itemContainer, ...styles.itemContainerCTA }} onPress={expand}>
                        <MaterialIcons name="add" size={24} color={'#fff'} />
                    </TouchableOpacity>
                    {lastHalf.map((route, index) => renderRoute(route, index + midIndex))}
                </>
            );
        },
        [state]
    );

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Animated.View
                ref={ref}
                style={{
                    ...styles.container,
                    height: animatedHeight
                }}
            >
                <View style={styles.innerContainer}>
                    {navigatorMode ? (
                        <Animated.View
                            style={{
                                ...styles.navigatorContainer,
                                paddingBottom: animatedHeight.interpolate({
                                    inputRange: [76, height - 100],
                                    outputRange: [0, 20]
                                }),
                                opacity: animatedHeight.interpolate({
                                    inputRange: [76, height - 100],
                                    outputRange: [1, 0]
                                })
                            }}
                        >
                            {renderRoutes(state.routes)}
                        </Animated.View>
                    ) : (
                        <Animated.View
                            {...panResponder.panHandlers}
                            style={{
                                flex: 1,
                                opacity: animatedHeight.interpolate({
                                    inputRange: [76, height - 100],
                                    outputRange: [0, 1]
                                })
                            }}
                        >
                            <ArtboardPage
                                navigation={navigation}
                                route={{
                                    key: 'artboard',
                                    name: 'Artboard',
                                    path: '/artboard',
                                    params: { vertexShaderSource, fragmentShaderSource }
                                }}
                            />
                        </Animated.View>
                    )}
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};
