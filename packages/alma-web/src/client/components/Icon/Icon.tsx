import { cx } from '@emotion/css';
import * as React from 'react';

import { iconWrapperStyles } from './Icon.styles';
import { IIconProps } from './Icon.types';

export const Icon = ({
    color,
    size = 20,
    outlined = false,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    name,
    className: extraClassName
}: IIconProps) => {
    return (
        <i
            className={cx(
                'material-symbols-outlined',
                iconWrapperStyles(size, color, outlined),
                'icon',
                extraClassName
            )}
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
