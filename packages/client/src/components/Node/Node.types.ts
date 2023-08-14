/** eslint-disable @typescript-eslint/no-explicit-any */

import { Input, Output } from '@usealma/graph';
import { DraggableEventHandler } from 'react-draggable';

interface INodePosition {
    x: number;
    y: number;
}

export interface INodeProps {
    name: string;
    inputs: Input<any>[];
    outputs: Output<any>[];
    position: INodePosition;
    active: boolean;
    icon: string;
    actions?: INodeActionProps[];
    onDrag: DraggableEventHandler;
    onClick?(e: React.MouseEvent<HTMLDivElement>): void;
    onFocus?(e: React.FocusEvent<HTMLDivElement>): void;
}

export interface INodeActionProps {
    icon?: string;
    color?: string;
    onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

export interface INodePortsProps {
    ports: Input<any>[] | Output<any>[];
    isOutputWrapper?: boolean;
}
