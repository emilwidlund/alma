import { Input } from '../../../core/Input/Input';
import { IInputProps } from '../../../core/Input/Input.types';
import { INodeProps } from '../../../core/Node/Node.types';
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
