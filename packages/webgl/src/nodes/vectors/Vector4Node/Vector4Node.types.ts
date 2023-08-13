import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { Vector4Node } from './Vector4Node';

export interface IVector4NodeInputs {
    [key: string]: Input<'float', Vector4Node>;
    x: Input<'float', Vector4Node>;
    y: Input<'float', Vector4Node>;
    z: Input<'float', Vector4Node>;
    w: Input<'float', Vector4Node>;
}

export interface IVector4NodeOutputs {
    [key: string]: Output<'vec4', Vector4Node>;
    vector4: Output<'vec4', Vector4Node>;
}

export interface IVector4NodeProps extends INodeProps {
    inputs?: {
        x?: IInputProps<'float'>;
        y?: IInputProps<'float'>;
        z?: IInputProps<'float'>;
        w?: IInputProps<'float'>;
    };
    outputs?: {
        vector4?: IOutputProps<'vec4'>;
    };
}
