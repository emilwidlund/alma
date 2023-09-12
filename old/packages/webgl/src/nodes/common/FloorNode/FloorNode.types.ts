import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { FloorNode } from './FloorNode';

export interface IFloorNodeInputs {
    [key: string]: Input<Prim, FloorNode>;
    input: Input<Prim, FloorNode>;
}

export interface IFloorNodeOutputs {
    [key: string]: Output<Prim, FloorNode>;
    output: Output<Prim, FloorNode>;
}

export interface IFloorNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
