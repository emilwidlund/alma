import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase, Route } from '@react-navigation/native';
import { GestureResponderEvent } from 'react-native';

export interface ITabNavigatorItemProps {
    route: Route<any>;
    active: boolean;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
    cta: boolean;
    onPress?: (e: GestureResponderEvent) => void;
}
