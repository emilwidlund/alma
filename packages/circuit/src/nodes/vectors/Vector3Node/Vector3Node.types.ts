import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { Vector3Node } from './Vector3Node';

export interface IVector3NodeInputs {
    [key: string]: Input<'float', Vector3Node>;
    x: Input<'float', Vector3Node>;
    y: Input<'float', Vector3Node>;
    z: Input<'float', Vector3Node>;
}

export interface IVector3NodeOutputs {
    [key: string]: Output<'vec3', Vector3Node>;
    vector3: Output<'vec3', Vector3Node>;
}

export interface IVector3NodeProps extends INodeProps {
    inputs?: {
        x?: IInputProps<'float'>;
        y?: IInputProps<'float'>;
        z?: IInputProps<'float'>;
    };
    outputs?: {
        vector3?: IOutputProps<'vec3'>;
    };
}
