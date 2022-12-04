import { MouseEventHandler } from 'react';

export enum ButtonVariant {
    PRIMARY,
    SECONDARY
}

export interface IButtonProps {
    label: string;
    variant?: ButtonVariant;
    disabled?: boolean;
    onPress?: MouseEventHandler<HTMLButtonElement>;
}
