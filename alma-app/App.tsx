import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={DashboardPage} />
            <Stack.Screen name="Artboard" component={ArtboardPage} />
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
    const [fontsLoaded] = useFonts({
        'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.otf'),
        'Inter-Thin': require('./assets/fonts/Inter-Thin.otf'),
        'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
        'Inter-Medium': require('./assets/fonts/Inter-Medium.otf'),
        'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.otf'),
        'Inter-Bold': require('./assets/fonts/Inter-SemiBold.otf'),
        'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.otf'),
        'Inter-Black': require('./assets/fonts/Inter-Black.otf')
    });

    return fontsLoaded ? (
        <>
            <StatusBar style="dark" />
            <NavigationContainer theme={theme}>
                <Tab.Navigator tabBar={props => <TabNavigator {...props} />} screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="ProjectStack" component={ProjectStack} />
                    <Tab.Screen name="ABC" component={Test} />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    ) : null;
}
