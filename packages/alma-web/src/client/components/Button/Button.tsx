import * as React from 'react';

import { buttonStyles } from './Button.styles';
import { IButtonProps } from './Button.types';

export const Button = ({ label, onPress }: IButtonProps) => {
    return (
        <button className={buttonStyles} onClick={onPress}>
            {label}
        </button>
    );
};
