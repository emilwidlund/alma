import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { SubtractionNode } from './SubtractionNode';

export interface ISubtractionNodeInputs {
    [key: string]: Input<'float', SubtractionNode>;
    a: Input<'float', SubtractionNode>;
    b: Input<'float', SubtractionNode>;
}

export interface ISubtractionNodeOutputs {
    [key: string]: Output<'float', SubtractionNode>;
    result: Output<'float', SubtractionNode>;
}

export interface ISubtractionNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<'float'>;
        b?: IInputProps<'float'>;
    };
    outputs?: {
        result?: IOutputProps<'float'>;
    };
}
