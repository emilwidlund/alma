import * as React from 'react';

export type ISchematicProps = React.PropsWithChildren<{
    onMouseMove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onMouseUp?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onMouseDown?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}>;
