import { IInputProps, INodeProps, IOutputProps, Output } from 'alma-graph';

import { UVNode } from './UVNode';

export interface IUVNodeInputs {
    [key: string]: never;
}

export interface IUVNodeOutputs {
    [key: string]: Output<'vec2', UVNode>;
    uv: Output<'vec2', UVNode>;
}

export interface IUVNodeProps extends INodeProps {
    inputs?: {
        center?: IInputProps<'bool'>;
    };
    outputs?: {
        uv?: IOutputProps<'vec2'>;
    };
}
