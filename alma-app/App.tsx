import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DashboardPage } from './src/pages/DashboardPage/DashboardPage';
import { ArtboardPage } from './src/pages/ArtboardPage/ArtboardPage';
import { TabNavigator } from './src/containers/TabNavigator/TabNavigator';

export type RootStackParamList = {
    Dashboard: undefined;
    Artboard: { fragmentShaderSource: string; vertexShaderSource: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff'
    }
};

const ProjectStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={DashboardPage} />
            <Stack.Screen name="Artboard" component={ArtboardPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

const Test = () => {
    return (
        <View>
            <Text>HELLO</Text>
        </View>
    );
};

export default function App() {
    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer theme={theme}>
                <Tab.Navigator tabBar={TabNavigator} screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="ProjectStack" component={ProjectStack} />
                    <Tab.Screen name="ABC" component={Test} />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}
