import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { AbsoluteNode } from './AbsoluteNode';

export interface IAbsoluteNodeInputs {
    [key: string]: Input<Prim, AbsoluteNode>;
    input: Input<Prim, AbsoluteNode>;
}

export interface IAbsoluteNodeOutputs {
    [key: string]: Output<Prim, AbsoluteNode>;
    output: Output<Prim, AbsoluteNode>;
}

export interface IAbsoluteNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
