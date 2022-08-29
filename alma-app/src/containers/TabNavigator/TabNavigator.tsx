import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Animated, Easing, GestureResponderEvent, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './TabNavigator.styles';
import { ITabNavigatorItemProps } from './TabNavigator.types';

const TabNavigatorItem = ({ cta, navigation, route, active, onPress }: ITabNavigatorItemProps) => {
    const routePressHandler = useCallback(
        (e: GestureResponderEvent) => {
            navigation.navigate(route.name);

            onPress?.(e);
        },
        [navigation, route]
    );

    const navigatorIcon = useMemo(() => {
        switch (route.name) {
            case 'ProjectStack':
                return 'stream';
            case 'Mid':
                return 'add';
            default:
                return 'face';
        }
    }, [route]);

    return (
        <TouchableOpacity
            key={route.key}
            style={{ ...styles.itemContainer, ...(cta ? styles.itemContainerCTA : {}) }}
            onPress={routePressHandler}
        >
            <MaterialIcons name={navigatorIcon} size={24} color={cta ? '#fff' : active ? '#000' : '#ccc'} />
        </TouchableOpacity>
    );
};

export const TabNavigator = ({ navigation, state }: BottomTabBarProps) => {
    const ref = useRef<View>(null);
    const animatedHeight = useRef(new Animated.Value(80)).current;

    const expand = useCallback(() => {
        Animated.timing(animatedHeight, {
            toValue: 800,
            duration: 400,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true
        }).start();
    }, []);

    useEffect(() => {
        const handle = animatedHeight.addListener(height => {
            ref.current?.setNativeProps({
                style: {
                    height: height.value
                }
            });
        });

        return () => {
            animatedHeight.removeListener(handle);
        };
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View ref={ref} style={styles.container}>
                {state.routes.map((route, index) => (
                    <TabNavigatorItem
                        key={route.key}
                        route={route}
                        active={state.index === index}
                        cta={route.name === 'Mid'}
                        navigation={navigation}
                        onPress={expand}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
};
