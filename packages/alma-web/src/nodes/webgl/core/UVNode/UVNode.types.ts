import { INodeProps, IOutputProps, Output } from 'alma-graph';

import { UVNode } from './UVNode';

export interface IUVNodeOutputs {
    [key: string]: Output<'vec2', UVNode>;
    uv: Output<'vec2', UVNode>;
}

export interface IUVNodeProps extends INodeProps {
    outputs?: {
        uv?: IOutputProps<'vec2'>;
    };
}
