import { Prim } from '@thi.ng/shader-ast';
import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { RadiansNode } from './RadiansNode';

export interface IRadiansNodeInputs {
    [key: string]: Input<Prim, RadiansNode>;
    degrees: Input<Prim, RadiansNode>;
}

export interface IRadiansNodeOutputs {
    [key: string]: Output<Prim, RadiansNode>;
    output: Output<Prim, RadiansNode>;
}

export interface IRadiansNodeProps extends INodeProps {
    inputs?: {
        degrees?: IInputProps<Prim>;
    };
    outputs?: {
        output?: IOutputProps<Prim>;
    };
}
