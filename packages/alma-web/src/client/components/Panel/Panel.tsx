import { cx } from '@emotion/css';
import * as React from 'react';

import { panelContentStyles, panelWrapperStyles, panelHeaderStyles } from './Panel.styles';
import { IPanelProps } from './Panel.types';

export const Panel = React.forwardRef<HTMLDivElement, IPanelProps>(({ children, className, header }, ref) => {
    return (
        <div ref={ref} className={cx(panelWrapperStyles, className)}>
            {header && <div className={panelHeaderStyles}>{header}</div>}
            <div className={panelContentStyles}>{children}</div>
        </div>
    );
});
