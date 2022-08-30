import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase, Route } from '@react-navigation/native';
import { GestureResponderEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export interface ITabNavigatorItemProps {
    route: Route<any>;
    active: boolean;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
    icon: string;
    onPress?: (e: GestureResponderEvent) => void;
}
