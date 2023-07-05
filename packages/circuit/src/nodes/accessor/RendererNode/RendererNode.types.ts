import { IInputProps, INodeProps, Input } from '@usealma/graph';

import { RendererNode } from './RendererNode';

export interface IRendererNodeInputs {
    [key: string]: Input<'vec4', RendererNode>;
    color: Input<'vec4', RendererNode>;
}

export interface IRendererNodeProps extends INodeProps {
    inputs?: {
        color?: IInputProps<'vec4'>;
    };
}
