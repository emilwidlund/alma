import React = require('react');
import { DraggableEventHandler } from 'react-draggable';
import { Input, Output } from '../../../core/api/Port';

interface INodePosition {
    x: number;
    y: number;
}

export interface INodeProps {
    name: string;
    inputs: Input[];
    outputs: Output[];
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
    ports: Input[] | Output[];
    isOutputWrapper?: boolean;
}
