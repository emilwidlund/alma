import type { CanvasNode } from './CanvasNode';
import type { INodeSerialized, INodeProps, INodeData } from '../../../core/api/Node/Node.types';
import type { NumberOutput } from '../../ports/NumberPort/NumberPort';
import type { INumberOutputSerialized } from '../../ports/NumberPort/NumberPort.types';

export interface ICanvasNodeOutputs {
    [index: string]: NumberOutput<CanvasNode>;
    width: NumberOutput<CanvasNode>;
    height: NumberOutput<CanvasNode>;
}

export interface ICanvasNodeSerializedOutputs {
    [index: string]: INumberOutputSerialized;
    width: INumberOutputSerialized;
    height: INumberOutputSerialized;
}

export type ICanvasNodeData = INodeData

export type ICanvasNodeSerialized = INodeSerialized<never, ICanvasNodeSerializedOutputs>

export type ICanvasNodeProps = INodeProps<ICanvasNodeSerialized>
