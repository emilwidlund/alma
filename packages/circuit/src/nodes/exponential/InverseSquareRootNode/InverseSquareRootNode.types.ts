import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { InverseSquareRootNode } from './InverseSquareRootNode';

export interface IInverseSquareRootNodeInputs {
    [key: string]: Input<Prim, InverseSquareRootNode>;
    input: Input<Prim, InverseSquareRootNode>;
}

export interface IInverseSquareRootNodeOutputs {
    [key: string]: Output<Prim, InverseSquareRootNode>;
    output: Output<Prim, InverseSquareRootNode>;
}

export interface IInverseSquareRootNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
