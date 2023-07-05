import { INodeProps, IOutputProps, Output } from '@usealma/graph';

import { CameraNode } from './CameraNode';

export interface ICameraNodeInputs {
    [key: string]: never;
}

export interface ICameraNodeOutputs {
    [key: string]: Output<'vec4', CameraNode>;
    camera: Output<'vec4', CameraNode>;
}

export interface ICameraNodeProps extends INodeProps {
    inputs?: {};
    outputs?: {
        camera?: IOutputProps<'vec4'>;
    };
}
