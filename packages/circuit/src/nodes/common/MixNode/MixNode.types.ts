import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeData, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { MixNode } from './MixNode';

export interface IMixNodeInputs {
    [key: string]: Input<'float', MixNode> | Input<Prim, MixNode>;
    a: Input<Prim, MixNode>;
    b: Input<Prim, MixNode>;
    t: Input<'float', MixNode>;
}

export interface IMixNodeOutputs {
    [key: string]: Output<Prim, MixNode>;
    output: Output<Prim, MixNode>;
}

export type IMixNodeData = INodeData<Prim>;

export interface IMixNodeProps extends INodeProps {
    data?: IMixNodeData;
    inputs?: {
        a?: IInputProps<Prim>;
        b?: IInputProps<Prim>;
        t?: IInputProps<'float'>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
