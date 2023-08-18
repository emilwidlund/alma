/** eslint-disable @typescript-eslint/no-explicit-any */

import { Input, Output } from '@usealma/graph';
import { DraggableEventHandler } from 'react-draggable';

interface NodePosition {
    x: number;
    y: number;
}

export interface NodeProps {
    name: string;
    inputs: Input<any>[];
    outputs: Output<any>[];
    position: NodePosition;
    active: boolean;
    icon: string;
    actions?: NodeActionProps[];
    onDrag: DraggableEventHandler;
    onClick?(e: React.MouseEvent<HTMLDivElement>): void;
    onFocus?(e: React.FocusEvent<HTMLDivElement>): void;
}

export interface NodeActionProps {
    icon?: string;
    color?: string;
    onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

export interface NodePortsProps {
    ports: Input<any>[] | Output<any>[];
    isOutputWrapper?: boolean;
}
