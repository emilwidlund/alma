import { cx } from '@emotion/css';
import * as React from 'react';

import { iconWrapperStyles } from './Icon.styles';
import { IIconProps } from './Icon.types';

export const Icon = ({
    size,
    color,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    name,
    className
}: IIconProps) => {
    return (
        <i
            className={cx(iconWrapperStyles(size, color), 'icon', className)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
        >
            {name}
        </i>
    );
};
