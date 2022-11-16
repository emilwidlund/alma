import { IInputProps, INodeProps, Input, IOutputProps, Output } from 'alma-graph';

import { GLSLNode } from './GLSLNode';

export interface IGLSLNodeInputs {
    [key: string]: Input<any, GLSLNode>;
}

export interface IGLSLNodeOutputs {
    [key: string]: Output<any, GLSLNode>;
}

export interface IGLSLNodeProps extends INodeProps {
    inputs?: Record<string, IInputProps<any>>;
    outputs?: {
        output?: IOutputProps<any>;
    };
}
