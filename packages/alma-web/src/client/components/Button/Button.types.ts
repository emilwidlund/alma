import { MouseEventHandler } from 'react';

export enum ButtonVariant {
    PRIMARY,
    SECONDARY,
    TERTIARY
}

export interface IButtonProps {
    label?: string;
    variant?: ButtonVariant;
    icon?: string;
    disabled?: boolean;
    onPress?: MouseEventHandler<HTMLButtonElement>;
}
