
import { IInputProps } from './Input/Input.types';
import { IOutputProps } from './Output/Output.types';
import { BooleanInput, BooleanOutput } from '../../client/ports/BooleanPort/BooleanPort';
import { NumberInput, NumberOutput } from '../../client/ports/NumberPort/NumberPort';
import { StringInput, StringOutput } from '../../client/ports/StringPort/StringPort';
import { ColorInput, ColorOutput } from '../../client/ports/ColorPort/ColorPort';
import { Vector2Input, Vector2Output } from '../../client/ports/Vector2Port/Vector2Port';
import { ValueType } from '../../client/lib/types';
import { INode } from '../../client/nodes';

export const getInputByProps = <TValue, TValueType extends ValueType>(node: INode, props: IInputProps<TValue, TValueType>) => {
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

export const getOutputByProps = <TValue, TValueType extends ValueType>(node: INode, props: IOutputProps<TValue, TValueType>) => {
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
