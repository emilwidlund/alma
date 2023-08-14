import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { ArccosineNode } from './ArccosineNode';

export interface IArccosineNodeInputs {
    [key: string]: Input<Prim, ArccosineNode>;
    input: Input<Prim, ArccosineNode>;
}

export interface IArccosineNodeOutputs {
    [key: string]: Output<Prim, ArccosineNode>;
    output: Output<Prim, ArccosineNode>;
}

export interface IArccosineNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
