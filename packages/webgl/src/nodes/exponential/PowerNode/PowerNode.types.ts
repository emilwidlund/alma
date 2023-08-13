import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { PowerNode } from './PowerNode';

export interface IPowerNodeInputs {
    [key: string]: Input<Prim, PowerNode>;
    a: Input<Prim, PowerNode>;
    b: Input<Prim, PowerNode>;
}

export interface IPowerNodeOutputs {
    [key: string]: Output<Prim, PowerNode>;
    output: Output<Prim, PowerNode>;
}

export interface IPowerNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<Prim>;
        b?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
