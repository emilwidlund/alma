import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { SmoothstepNode } from './SmoothstepNode';

export interface ISmoothstepNodeInputs {
    [key: string]: Input<Prim, SmoothstepNode>;
    edgeA: Input<Prim, SmoothstepNode>;
    edgeB: Input<Prim, SmoothstepNode>;
    input: Input<Prim, SmoothstepNode>;
}

export interface ISmoothstepNodeOutputs {
    [key: string]: Output<Prim, SmoothstepNode>;
    output: Output<Prim, SmoothstepNode>;
}

export interface ISmoothstepNodeProps extends INodeProps {
    inputs?: {
        edgeA?: IInputProps<Prim>;
        edgeB?: IInputProps<Prim>;
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
