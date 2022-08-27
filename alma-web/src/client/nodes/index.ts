import type { ICanvasNodeProps, ICanvasNodeSerialized } from './CanvasNode/CanvasNode.types';
import type { ICircleNodeProps, ICircleNodeSerialized } from './CircleNode/CircleNode.types';
import { CanvasNode } from './CanvasNode/CanvasNode';
import { CircleNode } from './CircleNode/CircleNode';
import { NodeConstructor } from '../../core/api/Node/Node.types';
import { Circuit } from '../lib/Circuit/Circuit';

export type INodeSerialized = ICanvasNodeSerialized | ICircleNodeSerialized;
export type INodeProps = ICanvasNodeProps | ICircleNodeProps;
export type CircuitNodeConstructor<T, TProps> = NodeConstructor<T, TProps, Circuit>;

export type NodeConstructors =
    | CircuitNodeConstructor<CanvasNode, ICanvasNodeProps>
    | CircuitNodeConstructor<CircleNode, ICircleNodeProps>;

export type INode = CanvasNode | CircleNode;

export interface INodesCollection extends Record<string, NodeConstructors> {}

export const Nodes: INodesCollection = {
    CanvasNode,
    CircleNode
};
