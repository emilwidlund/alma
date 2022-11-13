import { IInputProps, INodeProps, Input, IOutputProps, Output } from 'alma-graph';

import { Swizzle3Node } from './Swizzle3Node';

export interface ISwizzle3NodeInputs {
    [key: string]: Input<'vec3', Swizzle3Node>;
    vector: Input<'vec3', Swizzle3Node>;
}

export interface ISwizzle3NodeOutputs {
    [key: string]: Output<'float', Swizzle3Node>;
    x: Output<'float', Swizzle3Node>;
    y: Output<'float', Swizzle3Node>;
    z: Output<'float', Swizzle3Node>;
}

export interface ISwizzle3NodeProps extends INodeProps {
    inputs?: {
        vector?: IInputProps<'vec3'>;
    };
    outputs?: {
        x?: IOutputProps<'float'>;
        y?: IOutputProps<'float'>;
        z?: IOutputProps<'float'>;
    };
}
