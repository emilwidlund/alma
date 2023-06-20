import { MouseEventHandler, PropsWithChildren } from 'react';

export enum ButtonVariant {
    PRIMARY,
    SECONDARY,
    TERTIARY
}

export type ButtonProps = PropsWithChildren<{
    variant?: ButtonVariant;
    disabled?: boolean;
    compact?: boolean;
    onPress?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}>;
