import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { SwizzleNode } from './SwizzleNode';

export interface ISwizzleNodeInputs {
    [key: string]: Input<'vec2' | 'vec3' | 'vec4', SwizzleNode>;
    vector: Input<'vec2' | 'vec3' | 'vec4', SwizzleNode>;
}

export interface ISwizzleNodeOutputs {
    [key: string]: any;
    x: Output<'float', SwizzleNode>;
    y: Output<'float', SwizzleNode>;
    z?: Output<'float', SwizzleNode>;
    w?: Output<'float', SwizzleNode>;
}

export interface ISwizzleNodeProps extends INodeProps {
    inputs?: {
        vector?: IInputProps<'vec2'>;
    };
    outputs?: {
        x?: IOutputProps<'float'>;
        y?: IOutputProps<'float'>;
        z?: IOutputProps<'float'>;
        w?: IOutputProps<'float'>;
    };
}
