import { IConnectionProps } from '../Connection/Connection.types';
import { INodeProps, INodeSerialized } from '../Node/Node.types';
import { Optional } from '../types/helpers';

export interface IContextSerialized {
    id?: string;
    nodes?: INodeProps<INodeSerialized>[];
    connections?: IConnectionProps[];
}
export interface IContextProps extends Optional<IContextSerialized, 'id' | 'nodes' | 'connections'> {}
