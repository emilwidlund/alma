import { Context } from '../Context/Context';
import { Input } from '../Input/Input';
import { IInputProps } from '../Input/Input.types';
import { Output } from '../Output/Output';
import { IOutputProps } from '../Output/Output.types';

export type NodeInputs = Record<string, Input>;
export type NodeOutputs = Record<string, Output>;
export type NodeSerializedInputs = Record<string, IInputProps<unknown, unknown>>;
export type NodeSerializedOutputs = Record<string, IOutputProps<unknown, unknown>>;

export type INodeData = Record<string, unknown>

export interface INodeSerialized<
    TNodeSerializedInputs extends NodeSerializedInputs = NodeSerializedInputs,
    TNodeSerializedOutputs extends NodeSerializedOutputs = NodeSerializedOutputs,
    TNodeSerializedData extends Record<string, unknown> = Record<string, unknown>
> {
    nodeConstructor: string;
    id: string;
    name: string;
    inputs: TNodeSerializedInputs;
    outputs: TNodeSerializedOutputs;
    data: TNodeSerializedData;
}

export type INodeProps<TSerialized extends INodeSerialized> = Partial<Omit<TSerialized, 'nodeConstructor'>>;

export type NodeConstructor<T, TProps> = new (context: Context, props: TProps) => T;
