import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { TangentNode } from './TangentNode';

export interface ITangentNodeInputs {
    [key: string]: Input<Prim, TangentNode>;
    input: Input<Prim, TangentNode>;
}

export interface ITangentNodeOutputs {
    [key: string]: Output<Prim, TangentNode>;
    output: Output<Prim, TangentNode>;
}

export interface ITangentNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
