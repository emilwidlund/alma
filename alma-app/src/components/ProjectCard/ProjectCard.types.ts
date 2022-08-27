import { GestureResponderEvent } from 'react-native';

export interface IProjectCardProps {
    media: string;
    title: string;
    lastModified: string;
    onPress?: (e: GestureResponderEvent) => void;
}
