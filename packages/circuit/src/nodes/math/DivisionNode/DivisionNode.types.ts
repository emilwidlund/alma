import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { DivisionNode } from './DivisionNode';

export interface IDivisionNodeInputs {
    [key: string]: Input<'float', DivisionNode>;
    a: Input<'float', DivisionNode>;
    b: Input<'float', DivisionNode>;
}

export interface IDivisionNodeOutputs {
    [key: string]: Output<'float', DivisionNode>;
    result: Output<'float', DivisionNode>;
}

export interface IDivisionNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<'float'>;
        b?: IInputProps<'float'>;
    };
    outputs?: {
        result?: IOutputProps<'float'>;
    };
}
