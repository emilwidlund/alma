import { cx } from '@emotion/css';
import * as React from 'react';

import { circuitWrapperStyles, circuitContentStyles } from './Circuit.styles';
import { ICircuitProps } from './Circuit.types';

export const Circuit = React.forwardRef<HTMLDivElement, ICircuitProps>(
    ({ children, className, onMouseMove, onClick, onMouseDown, onMouseUp, onContextMenu }: ICircuitProps, ref) => {
        return (
            <div className={cx(circuitWrapperStyles, className)}>
                <div
                    ref={ref}
                    className={cx(circuitContentStyles, 'circuit')}
                    children={children}
                    onMouseMove={onMouseMove}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onClick={onClick}
                    onContextMenu={onContextMenu}
                />
            </div>
        );
    }
);
