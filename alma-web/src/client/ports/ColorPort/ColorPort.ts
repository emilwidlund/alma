import * as Color from 'color';

import { Input } from '../../../core/api/Input/Input';
import { Output } from '../../../core/api/Output/Output';
import { ValueType } from '../../lib/types';
import type { Node } from '../../../core/api/Node/Node';

export class ColorInput<TNode extends Node> extends Input<ValueType, Color, Color, TNode> {
    type = ValueType.COLOR;

    public valueSerializer(value: Color): Color {
        return value.toJSON();
    }

    public valueReviver(value: Color): Color {
        return Object.setPrototypeOf(value, Color.prototype);
    }
}

export class ColorOutput<TNode extends Node> extends Output<ValueType, Color, Color, TNode> {
    type = ValueType.COLOR;

    public valueSerializer(value: Color): Color {
        return value.toJSON();
    }

    public valueReviver(value: Color): Color {
        return Object.setPrototypeOf(value, Color.prototype);
    }
}
