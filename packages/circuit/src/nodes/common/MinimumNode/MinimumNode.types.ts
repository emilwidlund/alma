import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { MinimumNode } from './MinimumNode';

export interface IMinimumNodeInputs {
    [key: string]: Input<Prim, MinimumNode>;
    a: Input<Prim, MinimumNode>;
    b: Input<Prim, MinimumNode>;
}

export interface IMinimumNodeOutputs {
    [key: string]: Output<Prim, MinimumNode>;
    output: Output<Prim, MinimumNode>;
}

export interface IMinimumNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<Prim>;
        b?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
