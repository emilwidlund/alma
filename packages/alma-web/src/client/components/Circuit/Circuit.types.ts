import * as React from 'react';

export type ICircuitProps = React.PropsWithChildren<{
    className?: string;
    onMouseMove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onMouseUp?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onMouseDown?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onContextMenu?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}>;
