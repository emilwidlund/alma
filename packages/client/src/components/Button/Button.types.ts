
export enum ButtonVariant {
    PRIMARY,
    SECONDARY,
    TERTIARY
}

export type ButtonProps = React.ComponentProps<'button'> & {
    variant?: ButtonVariant;
    disabled?: boolean;
    compact?: boolean;
}
