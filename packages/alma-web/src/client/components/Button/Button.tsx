import { cx } from '@emotion/css';
import * as React from 'react';

import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import { buttonStyles } from './Button.styles';
import { IButtonProps } from './Button.types';

export const Button = ({ className, label, variant, icon, loading, disabled, onPress }: IButtonProps) => {
    const iconComponent = icon ? <Icon name={icon} size={16} /> : undefined;

    return (
        <button
            className={cx([buttonStyles(!!label, !!iconComponent, variant), className])}
            onClick={onPress}
            disabled={disabled || loading}
        >
            <div
                style={{
                    visibility: loading ? 'visible' : 'hidden',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <Spinner />
            </div>
            <div
                style={{
                    visibility: loading ? 'hidden' : 'visible',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                {iconComponent}
                {label}
            </div>
        </button>
    );
};
