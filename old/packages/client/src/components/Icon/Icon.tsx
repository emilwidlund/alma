import clsx from 'clsx';
import * as React from 'react';

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
            className={clsx('select-none', 'material-symbols-outlined', 'icon', extraClassName)}
            style={{
                color,
                fontSize: size,
                fontVariationSettings: `'FILL' ${outlined ? 0 : 1}, 'wght' 400, 'GRAD' 0, 'opsz' 20`
            }}
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
