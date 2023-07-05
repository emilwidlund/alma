import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { ArctangentNode } from './ArctangentNode';

export interface IArctangentNodeInputs {
    [key: string]: Input<Prim, ArctangentNode>;
    y: Input<Prim, ArctangentNode>;
    x: Input<Prim, ArctangentNode>;
}

export interface IArctangentNodeOutputs {
    [key: string]: Output<Prim, ArctangentNode>;
    output: Output<Prim, ArctangentNode>;
}

export interface IArctangentNodeProps extends INodeProps {
    inputs?: {
        y?: IInputProps<Prim>;
        x?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
