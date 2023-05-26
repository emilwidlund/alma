import { cx } from '@emotion/css';
import * as React from 'react';

import { circuitWrapperStyles, circuitContentStyles } from './Circuit.styles';
import { ICircuitProps } from './Circuit.types';
import { fromCartesianPoint } from '../../utils/coordinates/coordinates';

export const Circuit = React.forwardRef<HTMLDivElement, ICircuitProps>(
    (
        { children, size, className, onMouseMove, onClick, onMouseDown, onMouseUp, onContextMenu }: ICircuitProps,
        ref
    ) => {
        const scrollRef = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            if (scrollRef.current) {
                const { x, y } = fromCartesianPoint(size.width, size.height, 0, 0);
                const { x: offsetX, y: offsetY } = fromCartesianPoint(
                    scrollRef.current.clientWidth,
                    scrollRef.current.clientHeight,
                    0,
                    0
                );

                scrollRef.current.scrollTo({ left: x - offsetX, top: y - offsetY });
            }
        }, []);

        return (
            <div ref={scrollRef} className={cx(circuitWrapperStyles, className)}>
                <div
                    ref={ref}
                    className={cx(circuitContentStyles(size), 'circuit')}
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
