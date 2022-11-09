import { INodeProps } from '../../../core/Node/Node.types';
import { Output } from '../../../core/Output/Output';
import { IOutputProps } from '../../../core/Output/Output.types';
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
