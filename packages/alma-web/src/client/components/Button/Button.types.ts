import { MouseEventHandler } from 'react';

export interface IButtonProps {
    label: string;
    onPress: MouseEventHandler<HTMLButtonElement>;
}
