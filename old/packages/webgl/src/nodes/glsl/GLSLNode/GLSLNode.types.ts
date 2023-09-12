import { IInputProps, INodeData, INodeProps, Input, IOutputProps, Output } from '@usealma/graph';

import { GLSLNode } from './GLSLNode';

export interface IGLSLNodeInputs {
    [key: string]: Input<any, GLSLNode>;
}

export interface IGLSLNodeOutputs {
    [key: string]: Output<any, GLSLNode>;
}

export interface IGLSLNodeData extends INodeData {
    glsl: string;
}

export interface IGLSLNodeProps extends INodeProps {
    inputs?: Record<string, IInputProps<any>>;
    outputs?: {
        output?: IOutputProps<any>;
    };
    data: IGLSLNodeData;
}
