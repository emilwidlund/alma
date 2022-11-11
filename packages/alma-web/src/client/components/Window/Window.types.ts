import * as React from 'react';

export enum ResizeHandlePosition {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT
}

export type IWindowProps = React.PropsWithChildren<{
    className?: string;
    header?: React.ReactNode;
    resizeHandlePosition?: ResizeHandlePosition;
    defaultSize?: {
        width: number;
        height: number;
    };
}>;
