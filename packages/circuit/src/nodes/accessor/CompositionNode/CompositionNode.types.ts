import { INodeProps, IOutputProps, Output } from '@usealma/graph';

import { CompositionNode } from './CompositionNode';

export interface ICompositionNodeInputs {
    [key: string]: never;
}

export interface ICompositionNodeOutputs {
    [key: string]: Output<'vec4', CompositionNode>;
    texture: Output<'vec4', CompositionNode>;
}

export interface ICompositionNodeProps extends INodeProps {
    outputs?: {
        texture?: IOutputProps<'vec4'>;
    };
}
