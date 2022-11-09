import { Input } from '../../../../../alma-graph/src/core/Input/Input';
import { IInputProps } from '../../../../../alma-graph/src/core/Input/Input.types';
import { INodeProps } from '../../../../../alma-graph/src/core/Node/Node.types';
import { ArtboardNode } from './ArtboardNode';

export interface IArtboardNodeInputs {
    [key: string]: Input<'vec4', ArtboardNode>;
    color: Input<'vec4', ArtboardNode>;
}

export interface IArtboardNodeProps extends INodeProps {
    inputs?: {
        color?: IInputProps<'vec4'>;
    };
}
