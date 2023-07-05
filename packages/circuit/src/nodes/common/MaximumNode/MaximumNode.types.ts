import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { MaximumNode } from './MaximumNode';

export interface IMaximumNodeInputs {
    [key: string]: Input<Prim, MaximumNode>;
    a: Input<Prim, MaximumNode>;
    b: Input<Prim, MaximumNode>;
}

export interface IMaximumNodeOutputs {
    [key: string]: Output<Prim, MaximumNode>;
    output: Output<Prim, MaximumNode>;
}

export interface IMaximumNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<Prim>;
        b?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
