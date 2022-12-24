import { MouseEventHandler } from 'react';

export enum ButtonVariant {
    PRIMARY,
    SECONDARY,
    TERTIARY
}

export interface IButtonProps {
    className?: string;
    label?: string;
    variant?: ButtonVariant;
    icon?: string;
    disabled?: boolean;
    loading?: boolean;
    onPress?: MouseEventHandler<HTMLButtonElement>;
}
