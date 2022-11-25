import { MouseEventHandler } from 'react';

export interface IButtonProps {
    label: string;
    disabled?: boolean;
    onPress?: MouseEventHandler<HTMLButtonElement>;
}
