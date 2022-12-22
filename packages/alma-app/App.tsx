import 'react-native-get-random-values';
import { ApolloProvider } from '@apollo/client';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

import { apolloClient } from './src/apollo/client';
import { ArtboardPage } from './src/pages/ArtboardPage/ArtboardPage';
import { ExplorePage } from './src/pages/ExplorePage/ExplorePage';
import { ProfilePage } from './src/pages/ProfilePage/ProfilePage';

export type RootStackParamList = {
    Dashboard: undefined;
    Explore: undefined;
    Artboard: { fragmentShaderSource: string; vertexShaderSource: string };
    Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#000'
    }
};

const ProjectStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Explore" component={ExplorePage} />
            <Stack.Screen name="Artboard" component={ArtboardPage} />
        </Stack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

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
        <ApolloProvider client={apolloClient}>
            <StatusBar style="dark" />
            <NavigationContainer theme={theme}>
                {/* <Tab.Navigator tabBar={props => <TabNavigator {...props} />} screenOptions={{ headerShown: false }}> */}
                <Tab.Navigator tabBar={() => null} screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="ProjectStack" component={ProjectStack} />
                    <Tab.Screen name="Profile" component={ProfilePage} />
                </Tab.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    ) : null;
}
