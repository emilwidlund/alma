import { Type } from '@thi.ng/shader-ast';

import { Node } from '../../Node/Node';
import { Output } from '../../Output/Output';
import { Input } from '../Input/Input';

export interface IConnectionProps<TType extends Type> {
    id?: string;
    from: Output<TType, Node>;
    to: Input<TType, Node>;
}

export interface IConnectionSerialized<TType extends Type> {
    id: string;
    from: Output<TType, Node>['id'];
    to: Input<TType, Node>['id'];
}
