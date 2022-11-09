import type { CircleNode } from './CircleNode';
import type { INodeData, INodeProps, INodeSerialized } from '../../../core/api/Node/Node.types';
import type { ColorInput } from '../../ports/ColorPort/ColorPort';
import type { IColorInputSerialized } from '../../ports/ColorPort/ColorPort.types';
import type { NumberInput } from '../../ports/NumberPort/NumberPort';
import type { INumberInputSerialized } from '../../ports/NumberPort/NumberPort.types';
import type { Vector2Input } from '../../ports/Vector2Port/Vector2Port';

export interface ICircleNodeInputs {
    [index: string]: NumberInput<CircleNode> | Vector2Input<CircleNode> | ColorInput<CircleNode>;
    position: Vector2Input<CircleNode>;
    radius: NumberInput<CircleNode>;
    strokeWidth: NumberInput<CircleNode>;
    strokeColor: ColorInput<CircleNode>;
}

export interface ICircleNodeSerializedInputs {
    [index: string]: INumberInputSerialized | INumberInputSerialized | IColorInputSerialized;
    position: INumberInputSerialized;
    radius: INumberInputSerialized;
    strokeWidth: INumberInputSerialized;
    strokeColor: IColorInputSerialized;
}

export type ICircleNodeData = INodeData

export type ICircleNodeSerialized = INodeSerialized<ICircleNodeSerializedInputs, never>

export type ICircleNodeProps = INodeProps<ICircleNodeSerialized>
