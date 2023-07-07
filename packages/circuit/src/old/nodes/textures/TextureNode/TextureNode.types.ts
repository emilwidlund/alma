import { INodeData, INodeProps, IOutputProps, Output } from '@usealma/graph';

import { TextureNode } from './TextureNode';

export interface ITextureNodeInputs {
    [key: string]: never;
}

export interface ITextureNodeOutputs {
    [key: string]: Output<'vec4', TextureNode>;
    texture: Output<'vec4', TextureNode>;
}

export interface ITextureNodeData extends INodeData {
    uri: string;
}

export interface ITextureNodeProps extends INodeProps {
    inputs?: {};
    outputs?: {
        texture?: IOutputProps<'vec4'>;
    };
    data: ITextureNodeData;
}
