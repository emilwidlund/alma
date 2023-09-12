import { INodeProps, IOutputProps, Output } from '@usealma/graph';

import { ResolutionNode } from './ResolutionNode';

export interface IResolutionNodeInputs {
    [key: string]: never;
}

export interface IResolutionNodeOutputs {
    [key: string]: Output<'vec2', ResolutionNode>;
    resolution: Output<'vec2', ResolutionNode>;
}

export interface IResolutionNodeProps extends INodeProps {
    outputs?: {
        resolution?: IOutputProps<'vec2'>;
    };
}
