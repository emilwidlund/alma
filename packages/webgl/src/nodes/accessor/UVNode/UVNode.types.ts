import { INodeProps, IOutputProps, Output } from '@usealma/graph';

import { UVNode } from './UVNode';

export interface IUVNodeInputs {
    [key: string]: never;
}

export interface IUVNodeOutputs {
    [key: string]: Output<'vec2' | 'vec4', UVNode>;
    uv: Output<'vec2', UVNode>;
    fragCoord: Output<'vec4', UVNode>;
}

export interface IUVNodeProps extends INodeProps {
    outputs?: {
        uv?: IOutputProps<'vec2'>;
        fragCoord?: IOutputProps<'vec4'>;
    };
}
