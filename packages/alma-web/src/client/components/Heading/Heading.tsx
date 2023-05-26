import { cx } from '@emotion/css';
import * as React from 'react';

import { headingSignifierWrapperStyles, headingWrapperStyles } from './Heading.styles';
import { IHeadingProps } from './Heading.types';
import { Size } from '../../types';

export const Heading = ({ className, children, size, signifier, marginTop, marginBottom }: IHeadingProps) => {
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

    return (
        <Element
            className={cx(headingWrapperStyles(marginTop, marginBottom), 'heading', className)}
            children={content}
        />
    );
};

const HeadingSignifier = ({ children }: React.PropsWithChildren<{}>) => {
    return <span className={headingSignifierWrapperStyles}>{children}</span>;
};
