import * as React from 'react';

import { buttonStyles } from './Button.styles';
import { IButtonProps } from './Button.types';

export const Button = ({ label, disabled, onPress }: IButtonProps) => {
    return (
        <button className={buttonStyles} onClick={onPress} disabled={disabled}>
            {label}
        </button>
    );
};
