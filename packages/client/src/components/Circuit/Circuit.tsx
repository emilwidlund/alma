import { clsx } from 'clsx';
import * as React from 'react';
import usePanZoom from "use-pan-and-zoom";

import { CircuitProps } from './Circuit.types';
import { fromCartesianPoint } from '../../utils/coordinates/coordinates';

// eslint-disable-next-line react/display-name
export const Circuit = React.forwardRef<HTMLDivElement, CircuitProps>(
    ({ children, size, className, onMouseMove, onClick, onMouseDown, onMouseUp, onContextMenu }: CircuitProps, ref) => {
        const scrollRef = React.useRef<HTMLDivElement>(null);
        const { transform, setContainer, panZoomHandlers } = usePanZoom({ enableZoom: false });

        React.useEffect(() => {
            if (scrollRef.current) {
                setContainer(scrollRef.current)

                const { x, y } = fromCartesianPoint(size.width, size.height, 0, 0);
                const { x: offsetX, y: offsetY } = fromCartesianPoint(
                    scrollRef.current.clientWidth,
                    scrollRef.current.clientHeight,
                    0,
                    0
                );

                scrollRef.current.scrollTo({ left: x - offsetX, top: y - offsetY });
            }
// eslint-disabled-next-line react-hooks/exhaustive-deps
        }, []);

        const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault();

            if (e.button === 2) {
                panZoomHandlers?.onMouseDown?.(e);
            }
        }, [panZoomHandlers]);

        return (
            <div ref={scrollRef} className={clsx('relative w-full h-full overflow-auto', className)} {...panZoomHandlers} onMouseDown={handleMouseDown}>
                <div
                    ref={ref}
                    className="relative"
                    style={{
                        width: size.width,
                        height: size.height,
                        backgroundImage: 'radial-gradient(rgba(0,0,0,.15) 5%, transparent 5%)',
                        backgroundPosition: '0 0',
                        backgroundSize: '30px 30px',
                        transform
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
