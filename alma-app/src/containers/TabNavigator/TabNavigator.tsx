import React, { useCallback } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { GestureResponderEvent, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './TabNavigator.styles';
import { Route } from '@react-navigation/native';

export const TabNavigator = ({ navigation, state }: BottomTabBarProps) => {
    const routePressHandler = (route: Route<any, any>) => {
        return (e: GestureResponderEvent) => {
            navigation.navigate(route.name);
        };
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                {state.routes.map((route, index) => (
                    <TouchableOpacity key={route.key} onPress={routePressHandler(route)}>
                        <MaterialIcons name="face" size={24} color={index === state.index ? '#000' : '#ccc'} />
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};
