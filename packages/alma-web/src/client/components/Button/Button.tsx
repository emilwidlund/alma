import { cx } from '@emotion/css';
import * as React from 'react';

import { Icon } from '../Icon/Icon';
import { buttonStyles } from './Button.styles';
import { IButtonProps } from './Button.types';

export const Button = ({ className, label, variant, icon, disabled, onPress }: IButtonProps) => {
    const iconComponent = icon ? <Icon name={icon} size={16} /> : undefined;

    return (
        <button
            className={cx([buttonStyles(!!label, !!iconComponent, variant), className])}
            onClick={onPress}
            disabled={disabled}
        >
            {iconComponent}
            {label}
        </button>
    );
};
