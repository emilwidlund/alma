import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { CosineNode } from './CosineNode';

export interface ICosineNodeInputs {
    [key: string]: Input<Prim, CosineNode>;
    input: Input<Prim, CosineNode>;
}

export interface ICosineNodeOutputs {
    [key: string]: Output<Prim, CosineNode>;
    output: Output<Prim, CosineNode>;
}

export interface ICosineNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
