import { cx } from '@emotion/css';
import * as React from 'react';

import { Size } from '../../types';
import { headingSignifierWrapperStyles, headingWrapperStyles } from './Heading.styles';
import { IHeadingProps } from './Heading.types';

export const Heading = ({ className, children, size, signifier }: IHeadingProps) => {
    const Element = React.useMemo(() => {
        switch (size) {
            case Size.LG:
                return 'h1';
            case Size.MD:
                return 'h2';
            case Size.SM:
                return 'h3';
            case Size.XS:
                return 'h4';
        }
    }, [size]);

    const content = React.useMemo(
        () =>
            signifier ? (
                <>
                    <HeadingSignifier children={signifier} />
                    {children}
                </>
            ) : (
                children
            ),
        [signifier, children]
    );

    return <Element className={cx(headingWrapperStyles, 'heading', className)} children={content} />;
};

const HeadingSignifier = ({ children }: React.PropsWithChildren<{}>) => {
    return <span className={headingSignifierWrapperStyles}>{children}</span>;
};
