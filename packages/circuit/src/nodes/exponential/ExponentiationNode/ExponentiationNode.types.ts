import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { ExponentiationNode } from './ExponentiationNode';

export interface IExponentiationNodeInputs {
    [key: string]: Input<Prim, ExponentiationNode>;
    input: Input<Prim, ExponentiationNode>;
}

export interface IExponentiationNodeOutputs {
    [key: string]: Output<Prim, ExponentiationNode>;
    output: Output<Prim, ExponentiationNode>;
}

export interface IExponentiationNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
