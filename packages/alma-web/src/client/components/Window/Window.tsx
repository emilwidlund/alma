import { cx } from '@emotion/css';
import { Enable, Resizable } from 're-resizable';
import * as React from 'react';

import {
    windowContentStyles,
    windowHandleStyles,
    windowWrapperStyles,
    windowHeaderStyles,
    windowResizableStyles
} from './Window.styles';
import { IWindowProps, ResizeHandlePosition } from './Window.types';

export const Window = React.forwardRef<HTMLDivElement, IWindowProps>(
    ({ children, className, defaultSize, resizeHandlePosition, header }, ref) => {
        const enableHandle: Enable = React.useMemo(() => {
            return {
                top: resizeHandlePosition === ResizeHandlePosition.TOP,
                right: resizeHandlePosition === ResizeHandlePosition.RIGHT,
                bottom: resizeHandlePosition === ResizeHandlePosition.BOTTOM,
                left: resizeHandlePosition === ResizeHandlePosition.LEFT,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
            };
        }, [resizeHandlePosition]);

        return (
            <div ref={ref} className={cx(windowWrapperStyles, className)}>
                <Resizable
                    className={windowResizableStyles}
                    handleClasses={{
                        top: windowHandleStyles('top', 'height'),
                        right: windowHandleStyles('right', 'width'),
                        bottom: windowHandleStyles('bottom', 'height'),
                        left: windowHandleStyles('left', 'width')
                    }}
                    defaultSize={defaultSize}
                    enable={enableHandle}
                >
                    <div className={windowHeaderStyles}>{header}</div>
                    <div className={windowContentStyles}>{children}</div>
                </Resizable>
            </div>
        );
    }
);
