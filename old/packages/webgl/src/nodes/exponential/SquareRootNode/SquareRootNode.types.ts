import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { SquareRootNode } from './SquareRootNode';

export interface ISquareRootNodeInputs {
    [key: string]: Input<Prim, SquareRootNode>;
    input: Input<Prim, SquareRootNode>;
}

export interface ISquareRootNodeOutputs {
    [key: string]: Output<Prim, SquareRootNode>;
    output: Output<Prim, SquareRootNode>;
}

export interface ISquareRootNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
