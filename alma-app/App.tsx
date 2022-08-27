import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardPage } from './src/pages/DashboardPage/DashboardPage';
import { ArtboardPage } from './src/pages/ArtboardPage/ArtboardPage';

export type RootStackParamList = {
    Dashboard: undefined;
    Artboard: { fragmentShaderSource: string; vertexShaderSource: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Dashboard" component={DashboardPage} />
                    <Stack.Screen name="Artboard" component={ArtboardPage} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
