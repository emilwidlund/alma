import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { ArcsineNode } from './ArcsineNode';

export interface IArcsineNodeInputs {
    [key: string]: Input<Prim, ArcsineNode>;
    input: Input<Prim, ArcsineNode>;
}

export interface IArcsineNodeOutputs {
    [key: string]: Output<Prim, ArcsineNode>;
    output: Output<Prim, ArcsineNode>;
}

export interface IArcsineNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
