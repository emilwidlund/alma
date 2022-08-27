import { Output } from '../../../core/api/Output/Output';
import { Input } from '../../../core/api/Input/Input';
import { ValueType } from '../../lib/types';
import type { Node } from '../../../core/api/Node/Node';

export class BooleanInput<TNode extends Node> extends Input<ValueType, boolean, boolean, TNode> {
    type = ValueType.BOOLEAN;

    public valueSerializer(value: boolean): boolean {
        return value;
    }

    public valueReviver(serializedValue: boolean): boolean {
        return serializedValue;
    }
}

export class BooleanOutput<TNode extends Node> extends Output<ValueType, boolean, boolean, TNode> {
    type = ValueType.BOOLEAN;

    public valueSerializer(value: boolean): boolean {
        return value;
    }

    public valueReviver(serializedValue: boolean): boolean {
        return serializedValue;
    }
}
