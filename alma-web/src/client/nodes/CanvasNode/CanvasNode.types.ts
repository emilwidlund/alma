import type { INodeSerialized, INodeProps, INodeData } from '../../../core/api/Node/Node.types';
import type { NumberOutput } from '../../ports/NumberPort/NumberPort';
import type { INumberOutputSerialized } from '../../ports/NumberPort/NumberPort.types';
import type { CanvasNode } from './CanvasNode';

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

export interface ICanvasNodeData extends INodeData {}

export interface ICanvasNodeSerialized extends INodeSerialized<never, ICanvasNodeSerializedOutputs> {}

export interface ICanvasNodeProps extends INodeProps<ICanvasNodeSerialized> {}
