import * as React from 'react';

export enum ResizeHandlePosition {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT
}

export type PanelProps = React.PropsWithChildren<{
    header?: React.ReactNode;
    resizeHandlePosition?: ResizeHandlePosition;
    defaultSize?: {
        width: number;
        height: number;
    };
}>;
