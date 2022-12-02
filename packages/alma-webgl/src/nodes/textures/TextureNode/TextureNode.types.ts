import { IInputProps, INodeData, INodeProps, Input, IOutputProps, Output } from 'alma-graph';

import { TextureNode } from './TextureNode';

export interface ITextureNodeInputs {
    [key: string]: Input<'vec2', TextureNode>;
    uv: Input<'vec2', TextureNode>;
}

export interface ITextureNodeOutputs {
    [key: string]: Output<'vec4', TextureNode>;
    texture: Output<'vec4', TextureNode>;
}

export interface ITextureNodeData extends INodeData {
    uri: string;
}

export interface ITextureNodeProps extends INodeProps {
    inputs?: {
        uv?: IInputProps<'vec2'>;
    };
    outputs?: {
        texture?: IOutputProps<'vec4'>;
    };
    data: ITextureNodeData;
}
