import { IInputProps, INodeProps, Input } from '@usealma/graph';

import { WebGLContextNode } from './WebGLContextNode';

export interface IWebGLContextNodeInputs {
    [key: string]: Input<'vec4', WebGLContextNode>;
    color: Input<'vec4', WebGLContextNode>;
}

export interface IWebGLContextNodeProps extends INodeProps {
    inputs?: {
        color?: IInputProps<'vec4'>;
    };
}
