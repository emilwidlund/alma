import { INodeProps, IOutputProps, Output } from 'alma-graph';

import { CameraNode } from './CameraNode';

export interface ICameraNodeOutputs {
    [key: string]: Output<'sampler2D', CameraNode>;
    camera: Output<'sampler2D', CameraNode>;
}

export interface ICameraNodeProps extends INodeProps {
    outputs?: {
        camera?: IOutputProps<'sampler2D'>;
    };
}
