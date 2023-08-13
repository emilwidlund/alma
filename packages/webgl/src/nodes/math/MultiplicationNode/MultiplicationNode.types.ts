import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { MultiplicationNode } from './MultiplicationNode';

export interface IMultiplicationNodeInputs {
    [key: string]: Input<'float', MultiplicationNode>;
    a: Input<'float', MultiplicationNode>;
    b: Input<'float', MultiplicationNode>;
}

export interface IMultiplicationNodeOutputs {
    [key: string]: Output<'float', MultiplicationNode>;
    result: Output<'float', MultiplicationNode>;
}

export interface IMultiplicationNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<'float'>;
        b?: IInputProps<'float'>;
    };
    outputs?: {
        result?: IOutputProps<'float'>;
    };
}
