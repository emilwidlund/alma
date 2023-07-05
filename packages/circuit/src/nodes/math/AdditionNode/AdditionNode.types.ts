import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { AdditionNode } from './AdditionNode';

export interface IAdditionNodeInputs {
    [key: string]: Input<'float', AdditionNode>;
    a: Input<'float', AdditionNode>;
    b: Input<'float', AdditionNode>;
}

export interface IAdditionNodeOutputs {
    [key: string]: Output<'float', AdditionNode>;
    result: Output<'float', AdditionNode>;
}

export interface IAdditionNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<'float'>;
        b?: IInputProps<'float'>;
    };
    outputs?: {
        result?: IOutputProps<'float'>;
    };
}
