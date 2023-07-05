import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { DegreesNode } from './DegreesNode';

export interface IDegreesNodeInputs {
    [key: string]: Input<Prim, DegreesNode>;
    radians: Input<Prim, DegreesNode>;
}

export interface IDegreesNodeOutputs {
    [key: string]: Output<Prim, DegreesNode>;
    output: Output<Prim, DegreesNode>;
}

export interface IDegreesNodeProps extends INodeProps {
    inputs?: {
        radians?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
