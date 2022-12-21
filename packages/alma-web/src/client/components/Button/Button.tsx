import * as React from 'react';

import { Icon } from '../Icon/Icon';
import { buttonStyles } from './Button.styles';
import { IButtonProps } from './Button.types';

export const Button = ({ label, variant, icon, disabled, onPress }: IButtonProps) => {
    const iconComponent = icon ? <Icon name={icon} size={16} /> : undefined;

    return (
        <button className={buttonStyles(!!label, !!iconComponent, variant)} onClick={onPress} disabled={disabled}>
            {iconComponent}
            {label}
        </button>
    );
};
