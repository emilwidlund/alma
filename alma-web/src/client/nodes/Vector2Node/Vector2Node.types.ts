import { Vector2Node } from './Vector2Node';
import { INodeData, INodeProps, INodeSerialized } from '../../../core/api/Node/Node.types';
import { NumberInput, NumberOutput } from '../../ports/NumberPort/NumberPort';
import { INumberInputSerialized, INumberOutputSerialized } from '../../ports/NumberPort/NumberPort.types';
import { Vector2Output } from '../../ports/Vector2Port/Vector2Port';
import { IVector2OutputSerialized } from '../../ports/Vector2Port/Vector2Port.types';

export interface IVector2NodeInputs {
    [index: string]: NumberInput<Vector2Node>;
    x: NumberInput<Vector2Node>;
    y: NumberInput<Vector2Node>;
}

export interface IVector2NodeOutputs {
    [index: string]: Vector2Output<Vector2Node> | NumberOutput<Vector2Node>;
    out: Vector2Output<Vector2Node>;
    magnitude: NumberOutput<Vector2Node>;
    angle: NumberOutput<Vector2Node>;
}

export interface IVector2NodeSerializedInputs {
    [index: string]: INumberInputSerialized;
    x: INumberInputSerialized;
    y: INumberInputSerialized;
}

export interface IVector2NodeSerializedOutputs {
    [index: string]: IVector2OutputSerialized | INumberOutputSerialized;
    out: INumberOutputSerialized;
    magnitude: INumberOutputSerialized;
    angle: INumberOutputSerialized;
}

export type IVector2NodeData = INodeData

export type IVector2NodeSerialized = INodeSerialized<IVector2NodeSerializedInputs, IVector2NodeSerializedOutputs>

export type IVector2NodeProps = INodeProps<IVector2NodeSerialized>
