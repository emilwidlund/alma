import { Input, Output } from 'alma-graph';
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
    actions?: INodeActionProps[];
    onDrag: DraggableEventHandler;
    onClick?(e: React.MouseEvent<HTMLDivElement>): void;
    onFocus?(e: React.FocusEvent<HTMLDivElement>): void;
}

export interface INodeActionProps {
    color: string;
    onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

export interface INodePortsProps {
    ports: Input<any>[] | Output<any>[];
    isOutputWrapper?: boolean;
}
