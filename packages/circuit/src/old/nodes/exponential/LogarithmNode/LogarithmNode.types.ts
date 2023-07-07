import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { LogarithmNode } from './LogarithmNode';

export interface ILogarithmNodeInputs {
    [key: string]: Input<Prim, LogarithmNode>;
    input: Input<Prim, LogarithmNode>;
}

export interface ILogarithmNodeOutputs {
    [key: string]: Output<Prim, LogarithmNode>;
    output: Output<Prim, LogarithmNode>;
}

export interface ILogarithmNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
