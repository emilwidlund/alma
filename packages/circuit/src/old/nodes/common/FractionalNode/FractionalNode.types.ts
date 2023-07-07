import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { FractionalNode } from './FractionalNode';

export interface IFractionalNodeInputs {
    [key: string]: Input<Prim, FractionalNode>;
    input: Input<Prim, FractionalNode>;
}

export interface IFractionalNodeOutputs {
    [key: string]: Output<Prim, FractionalNode>;
    output: Output<Prim, FractionalNode>;
}

export interface IFractionalNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
