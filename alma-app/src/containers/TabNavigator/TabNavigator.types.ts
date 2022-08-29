import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase, Route } from '@react-navigation/native';

export interface ITabNavigatorItemProps {
    route: Route<any>;
    active: boolean;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
    cta: boolean;
}
