import { IInputProps, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { CrossProductNode } from './CrossProductNode';

export interface ICrossProductNodeInputs {
    [key: string]: Input<'vec3', CrossProductNode>;
    a: Input<'vec3', CrossProductNode>;
    b: Input<'vec3', CrossProductNode>;
}

export interface ICrossProductNodeOutputs {
    [key: string]: Output<'vec3', CrossProductNode>;
    output: Output<'vec3', CrossProductNode>;
}

export interface ICrossProductNodeProps extends INodeProps {
    inputs?: {
        a?: IInputProps<'vec3'>;
        b?: IInputProps<'vec3'>;
    };
    outputs?: {
        output?: IOutputProps<'vec3'>;
    };
}
