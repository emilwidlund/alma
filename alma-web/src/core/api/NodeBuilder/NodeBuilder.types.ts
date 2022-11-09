import { Optional } from '../types/helpers';

export interface IPort<TValueType> {
    id: string;
    name: string;
    type: TValueType;
}

export interface IInput<TValue, TSerializedValue, TValueType> extends IPort<TValueType> {
    defaultValue: TValue;
    value: TValue;
    validator: (value: unknown) => value is TValue;
    valueReviver: (serializedValue: TSerializedValue) => TValue;
    valueSerializer: (value: TValue) => TSerializedValue;
}

export type IInputProps<TValue, TSerializedValue, TValueType> = Optional<IInput<TValue, TSerializedValue, TValueType>, 'id' | 'name' | 'value' | 'validator'>

export interface IInputSerialized<TSerializedValue, TValueType> {
    id: string;
    name: string;
    type: TValueType;
    defaultValue: TSerializedValue;
    value: TSerializedValue;
}

export interface IOutput<TValue, TValueType> extends IPort<TValueType> {
    get value(): TValue;
}

export type IOutputProps<TValue, TValueType> = Optional<IOutput<TValue, TValueType>, 'id' | 'name'>

export interface IOutputSerialized<TValueType> {
    id: string;
    name: string;
    type: TValueType;
}

export type IOutputPropsInitializer<TValue, TValueType, TNode = INode> = (
    node: TNode
) => IOutputProps<TValue, TValueType>;

export interface INodeSerialized<
    TInputs extends Record<string, IInputProps<unknown, unknown, unknown>> = Record<
        string,
        IInputProps<unknown, unknown, unknown>
    >,
    TOutputs extends Record<string, IOutputProps<unknown, unknown>> = Record<string, IOutputProps<unknown, unknown>>
> {
    id: string;
    name: string;
    inputs: TInputs;
    outputs: TOutputs;
}

export interface INode<
    TInputs = Record<string, IInput<unknown, unknown, unknown>>,
    TOutputs = Record<string, IOutput<unknown, unknown>>
> {
    id: string;
    name: string;
    inputs: TInputs;
    outputs: TOutputs;
    serialize(): INodeSerialized;
}

export interface INodeBuilder<TNode extends INode = INode> {
    node: TNode;
    name(name: string): INodeBuilder<TNode>;
    input<TName extends PropertyKey, TValue, TSerializedValue, TValueType>(
        name: TName,
        inputProps: IInputProps<TValue, TSerializedValue, TValueType>
    ): INodeBuilder<
        TNode & {
            inputs: TNode['inputs'] & { [K in TName]: IInput<TValue, TSerializedValue, TValueType> };
        }
    >;
    output<TName extends PropertyKey, TValue, TValueType>(
        name: TName,
        outputProps: IOutputPropsInitializer<TValue, TValueType, TNode>
    ): INodeBuilder<
        TNode & {
            outputs: TNode['outputs'] & { [K in TName]: IOutput<TValue, TValueType> };
        }
    >;
}
