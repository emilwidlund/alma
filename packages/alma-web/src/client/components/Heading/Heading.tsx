import { cx } from '@emotion/css';
import * as React from 'react';

import { Size } from '../../types';
import { headingWrapperStyles } from './Heading.styles';
import { IHeadingProps } from './Heading.types';

export const Heading = ({ className, children, size, marginTop, marginBottom }: IHeadingProps) => {
    const Element = React.useMemo(() => {
        switch (size) {
            case Size.LG:
                return 'h2';
            case Size.MD:
                return 'h3';
            case Size.SM:
                return 'h4';
        }
    }, [size]);

    return (
        <Element
            className={cx(headingWrapperStyles(marginTop, marginBottom), 'heading', className)}
            children={children}
        />
    );
};
