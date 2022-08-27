import { Input } from '../../../core/api/Input/Input';
import { Output } from '../../../core/api/Output/Output';
import { ValueType } from '../../lib/types';
import { Vector2 } from '../../lib/Vector2/Vector2';
import type { Node } from '../../../core/api/Node/Node';
import type { Vector2SerializedValue } from './Vector2Port.types';

export class Vector2Input<TNode extends Node> extends Input<ValueType, Vector2, Vector2SerializedValue, TNode> {
    type = ValueType.VECTOR2;

    public valueSerializer(value: Vector2): Vector2SerializedValue {
        return value.toArray();
    }

    public valueReviver(serializedValue: Vector2SerializedValue): Vector2 {
        return Vector2.from(serializedValue);
    }
}

export class Vector2Output<TNode extends Node> extends Output<ValueType, Vector2, Vector2SerializedValue, TNode> {
    type = ValueType.VECTOR2;

    public valueSerializer(value: Vector2): Vector2SerializedValue {
        return value.toArray();
    }

    public valueReviver(serializedValue: Vector2SerializedValue): Vector2 {
        return Vector2.from(serializedValue);
    }
}
