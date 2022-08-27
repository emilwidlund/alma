import { Input } from '../../../core/api/Input/Input';
import { Output } from '../../../core/api/Output/Output';
import { ValueType } from '../../lib/types';
import type { Node } from '../../../core/api/Node/Node';

export class StringInput<TNode extends Node> extends Input<ValueType, string, string, TNode> {
    type = ValueType.STRING;

    public valueSerializer(value: string): string {
        return value;
    }

    public valueReviver(serializedValue: string): string {
        return serializedValue;
    }
}

export class StringOutput<TNode extends Node> extends Output<ValueType, string, string, TNode> {
    type = ValueType.STRING;

    public valueSerializer(value: string): string {
        return value;
    }

    public valueReviver(serializedValue: string): string {
        return serializedValue;
    }
}
