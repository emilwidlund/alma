import React, { useCallback, useMemo } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { GestureResponderEvent, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Route } from '@react-navigation/native';

import { styles } from './TabNavigator.styles';
import { ITabNavigatorItemProps } from './TabNavigator.types';

const TabNavigatorItem = ({ cta, navigation, route, active }: ITabNavigatorItemProps) => {
    const routePressHandler = useCallback(() => {
        navigation.navigate(route.name);
    }, [navigation, route]);

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
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                {state.routes.map((route, index) => (
                    <TabNavigatorItem
                        key={route.key}
                        route={route}
                        active={state.index === index}
                        cta={route.name === 'Mid'}
                        navigation={navigation}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
};
