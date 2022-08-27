import type { INode } from './Node';
import type { InputProps, OutputProps } from './Port';
import { BooleanInput, BooleanOutput } from '../../client/ports/BooleanPort/BooleanPort';
import { ColorInput, ColorOutput } from './Port/ColorPort/ColorPort';
import { NumberInput, NumberOutput } from './Port/NumberPort/NumberPort';
import { StringInput, StringOutput } from './Port/StringPort/StringPort';
import { Vector2Input, Vector2Output } from './Port/Vector2Port/Vector2Port';
import { ValueType } from './types/values';

export const getInputByProps = (node: INode, props: InputProps) => {
    const { type } = props;

    switch (type) {
        case ValueType.BOOLEAN:
            return new BooleanInput(node, props);
        case ValueType.NUMBER:
            return new NumberInput(node, props);
        case ValueType.STRING:
            return new StringInput(node, props);
        case ValueType.COLOR:
            return new ColorInput(node, props);
        case ValueType.VECTOR2:
            return new Vector2Input(node, props);
        default:
            throw new Error(`Input Constructor for value type ${type} does not exist`);
    }
};

export const getOutputByProps = (node: INode, props: OutputProps) => {
    const { type } = props;

    switch (type) {
        case ValueType.BOOLEAN:
            return new BooleanOutput(node, props);
        case ValueType.NUMBER:
            return new NumberOutput(node, props);
        case ValueType.STRING:
            return new StringOutput(node, props);
        case ValueType.COLOR:
            return new ColorOutput(node, props);
        case ValueType.VECTOR2:
            return new Vector2Output(node, props);
        default:
            throw new Error(`Output Constructor for value type ${type} does not exist`);
    }
};
