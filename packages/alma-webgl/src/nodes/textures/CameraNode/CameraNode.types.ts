import { IInputProps, INodeProps, Input, IOutputProps, Output } from 'alma-graph';

import { CameraNode } from './CameraNode';

export interface ICameraNodeInputs {
    [key: string]: Input<'vec2', CameraNode>;
    uv: Input<'vec2', CameraNode>;
}

export interface ICameraNodeOutputs {
    [key: string]: Output<'vec4', CameraNode>;
    camera: Output<'vec4', CameraNode>;
}

export interface ICameraNodeProps extends INodeProps {
    inputs?: {
        uv?: IInputProps<'vec2'>;
    };
    outputs?: {
        camera?: IOutputProps<'vec4'>;
    };
}
