import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { ClampNode } from './ClampNode';

export interface IClampNodeInputs {
    [key: string]: Input<Prim, ClampNode>;
    input: Input<Prim, ClampNode>;
    min: Input<Prim, ClampNode>;
    max: Input<Prim, ClampNode>;
}

export interface IClampNodeOutputs {
    [key: string]: Output<Prim, ClampNode>;
    output: Output<Prim, ClampNode>;
}

export interface IClampNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
        min?: IInputProps<Prim>;
        max?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
