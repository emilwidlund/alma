import { IInputProps, INodeProps, Input, IOutputProps, Output } from 'alma-graph';

import { FractionalNode } from './FractionalNode';

export interface IFractionalNodeInputs {
    [key: string]: Input<'float' | 'vec2' | 'vec3' | 'vec4', FractionalNode>;
    input: Input<'float' | 'vec2' | 'vec3' | 'vec4', FractionalNode>;
}

export interface IFractionalNodeOutputs {
    [key: string]: Output<'float' | 'vec2' | 'vec3' | 'vec4', FractionalNode>;
    output: Output<'float' | 'vec2' | 'vec3' | 'vec4', FractionalNode>;
}

export interface IFractionalNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<'float' | 'vec2' | 'vec3' | 'vec4'>;
    };
    outputs?: {
        output?: IOutputProps<'float' | 'vec2' | 'vec3' | 'vec4'>;
    };
}
