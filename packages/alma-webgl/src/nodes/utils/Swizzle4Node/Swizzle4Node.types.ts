import { IInputProps, INodeProps, Input, IOutputProps, Output } from 'alma-graph';

import { Swizzle4Node } from './Swizzle4Node';

export interface ISwizzle4NodeInputs {
    [key: string]: Input<'vec4', Swizzle4Node>;
    vector: Input<'vec4', Swizzle4Node>;
}

export interface ISwizzle4NodeOutputs {
    [key: string]: Output<'float', Swizzle4Node>;
    x: Output<'float', Swizzle4Node>;
    y: Output<'float', Swizzle4Node>;
    z: Output<'float', Swizzle4Node>;
}

export interface ISwizzle4NodeProps extends INodeProps {
    inputs?: {
        vector?: IInputProps<'vec4'>;
    };
    outputs?: {
        x?: IOutputProps<'float'>;
        y?: IOutputProps<'float'>;
        z?: IOutputProps<'float'>;
    };
}
