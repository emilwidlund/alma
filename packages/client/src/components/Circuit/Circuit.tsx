import { clsx } from 'clsx';
import * as React from 'react';

import { CircuitProps } from './Circuit.types';
import { fromCartesianPoint } from '../../utils/coordinates/coordinates';

// eslint-disable-next-line react/display-name
export const Circuit = React.forwardRef<HTMLDivElement, CircuitProps>(
    ({ children, size, className, onMouseMove, onClick, onMouseDown, onMouseUp, onContextMenu }: CircuitProps, ref) => {
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
            <div ref={scrollRef} className={clsx('relative w-full h-full overflow-auto', className)}>
                <div
                    ref={ref}
                    className="relative"
                    style={{
                        width: size.width,
                        height: size.height,
                        backgroundImage: 'radial-gradient(#bfbfbf 5%, transparent 5%)',
                        backgroundPosition: '0 0',
                        backgroundSize: '30px 30px'
                    }}
                    onMouseMove={onMouseMove}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onClick={onClick}
                    onContextMenu={onContextMenu}
                >
                    {children}
                </div>
            </div>
        );
    }
);
