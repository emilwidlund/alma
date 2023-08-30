import { clsx } from 'clsx';

import { ButtonProps, ButtonVariant } from './Button.types';

export const Button = ({
    children,
    variant = ButtonVariant.PRIMARY,
    compact,
    disabled,
    className,
    ...props
}: ButtonProps) => {
    const classNames = clsx(
        'relative flex cursor-pointer text-sm hover:opacity-60 active:opacity-50 disabled:opacity-20 transition-opacity',
        {
            'bg-accent': variant === ButtonVariant.PRIMARY,
            'bg-transparent': variant === ButtonVariant.TERTIARY,
            'bg-neutral-600': variant === ButtonVariant.SECONDARY,
            'border border-neutral-500': variant === ButtonVariant.SECONDARY,
            'drop-shadow-xl': variant === ButtonVariant.PRIMARY,
            'py-3 px-6': !compact,
            'py-2.5 px-3': compact,
            'rounded-xl': !compact,
            'rounded-lg': compact,
            'text-text-dark': variant !== ButtonVariant.PRIMARY,
            'text-white': variant === ButtonVariant.PRIMARY
        },
        className
    );

    return (
        <button className={classNames} disabled={disabled} {...props}>
            {children}
        </button>
    );
};
