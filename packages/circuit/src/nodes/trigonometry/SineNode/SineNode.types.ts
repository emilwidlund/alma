import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { SineNode } from './SineNode';

export interface ISineNodeInputs {
    [key: string]: Input<Prim, SineNode>;
    input: Input<Prim, SineNode>;
}

export interface ISineNodeOutputs {
    [key: string]: Output<Prim, SineNode>;
    output: Output<Prim, SineNode>;
}

export interface ISineNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
