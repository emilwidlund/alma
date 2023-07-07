import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { SignNode } from './SignNode';

export interface ISignNodeInputs {
    [key: string]: Input<Prim, SignNode>;
    input: Input<Prim, SignNode>;
}

export interface ISignNodeOutputs {
    [key: string]: Output<Prim, SignNode>;
    output: Output<Prim, SignNode>;
}

export interface ISignNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
