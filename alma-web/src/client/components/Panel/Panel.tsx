import * as React from 'react';
import { Enable, Resizable } from 're-resizable';

import {
    panelContentStyles,
    panelHandleStyles,
    panelWrapperStyles,
    panelHeaderStyles,
    panelResizableStyles
} from './Panel.styles';
import { PanelProps, ResizeHandlePosition } from './Panel.types';

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
    ({ children, defaultSize, resizeHandlePosition, header }: PanelProps, ref) => {
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
            <div ref={ref} className={panelWrapperStyles}>
                <Resizable
                    className={panelResizableStyles}
                    handleClasses={{
                        top: panelHandleStyles('top', 'height'),
                        right: panelHandleStyles('right', 'width'),
                        bottom: panelHandleStyles('bottom', 'height'),
                        left: panelHandleStyles('left', 'width')
                    }}
                    defaultSize={defaultSize}
                    enable={enableHandle}
                >
                    <div className={panelHeaderStyles}>{header}</div>
                    <div className={panelContentStyles}>{children}</div>
                </Resizable>
            </div>
        );
    }
);
