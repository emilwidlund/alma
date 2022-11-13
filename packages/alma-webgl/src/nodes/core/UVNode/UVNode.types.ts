import { IInputProps, INodeProps, Input, IOutputProps, Output } from 'alma-graph';

import { UVNode } from './UVNode';

export interface IUVNodeInputs {
    [key: string]: Input<'bool', UVNode>;
    center: Input<'bool', UVNode>;
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
