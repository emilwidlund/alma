import { defaults } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

import { MergeIntersection } from '../types/helpers';
import {
    IInput,
    IInputProps,
    IInputSerialized,
    INode,
    INodeBuilder,
    INodeSerialized,
    IOutput,
    IOutputProps,
    IOutputPropsInitializer,
    IOutputSerialized
} from './NodeBuilder.types';

export class NodeBuilder<TNode extends INode = INode> implements INodeBuilder<TNode> {
    /** Node being constructed */
    public node: TNode;

    constructor(initialNode?: Partial<INode>) {
        this.node = defaults(initialNode, {
            id: uuid(),
            name: 'Untitled',
            inputs: {},
            outputs: {},
            serialize: () => {
                return {
                    id: this.node.id,
                    name: this.node.name,
                    inputs: this.getSerializedPorts(this.node.inputs),
                    outputs: this.getSerializedPorts(this.node.outputs)
                };
            }
        }) as TNode;

        makeAutoObservable(this);
    }

    /** Restores a node from serialized state */
    static from<T extends INodeSerialized>(props: T) {
        const node: Partial<INode> = {
            id: props.id,
            name: props.name
        };

        return Object.entries(props.inputs).reduce(
            (b, [key, inputProps]) => b.input(key, inputProps),
            new NodeBuilder(node)
        );
    }

    /** Writes a field to the node and returns a new NodeBuilder with updated types */
    private addField<TKey extends PropertyKey, TValue>(
        key: TKey,
        value: TValue
    ): NodeBuilder<MergeIntersection<TNode & { [K in TKey]: TValue }>> {
        Object.defineProperty(this.node, key, {
            value,
            enumerable: true,
            writable: true
        });

        return new NodeBuilder(this.node as MergeIntersection<TNode & { [K in TKey]: TValue }>);
    }

    /** Returns port from props */
    private getPortFromProps<TValue, TSerializedValue, TValueType>(
        props: IInputProps<TValue, TSerializedValue, TValueType>
    ): IInput<TValue, TSerializedValue, TValueType>;
    private getPortFromProps<TValue, TValueType>(props: IOutputProps<TValue, TValueType>): IOutput<TValue, TValueType>;
    private getPortFromProps<
        TValue,
        TSerializedValue,
        TValueType,
        TPort extends IInput<TValue, TSerializedValue, TValueType> | IOutput<TValue, TValueType>
    >(props: IInputProps<TValue, TSerializedValue, TValueType> | IOutputProps<TValue, TValueType>): TPort {
        const port = defaults(props, {
            id: uuid(),
            name: 'Untitled'
        });

        return makeAutoObservable(port) as TPort;
    }

    /** Defines a port on a given port */
    private definePort<TName extends PropertyKey, TValue, TSerializedValue, TValueType>(
        name: TName,
        input: IInput<TValue, TSerializedValue, TValueType>,
        portField: Extract<keyof INode, 'inputs'>
    ): NodeBuilder<
        TNode & {
            [KA in typeof portField]: TNode[typeof portField] & {
                [KB in TName]: IInput<TValue, TSerializedValue, TValueType>;
            };
        }
    >;
    private definePort<TName extends PropertyKey, TValue, TValueType>(
        name: TName,
        output: IOutput<TValue, TValueType>,
        portField: Extract<keyof INode, 'outputs'>
    ): NodeBuilder<
        TNode & {
            [KA in typeof portField]: TNode[typeof portField] & { [KB in TName]: IOutput<TValue, TValueType> };
        }
    >;
    private definePort<TName extends PropertyKey, TValue, TSerializedValue, TValueType>(
        name: TName,
        port: IInput<TValue, TSerializedValue, TValueType> | IOutput<TValue, TValueType>,
        portField: Extract<keyof INode, 'inputs' | 'outputs'>
    ) {
        Object.defineProperty(this.node[portField], name, {
            value: port,
            writable: true,
            enumerable: true
        });

        return new NodeBuilder(
            this.node as TNode & {
                [KA in typeof portField]: TNode[typeof portField] & {
                    [KB in TName]: IInput<TValue, TSerializedValue, TValueType> | IOutput<TValue, TValueType>;
                };
            }
        );
    }

    /** Extracts serialized state from port */
    private getSerializedPort<TValue, TSerializedValue, TValueType>(
        port: IInput<TValue, TSerializedValue, TValueType>
    ): IInputSerialized<TSerializedValue, TValueType>;
    private getSerializedPort<TValue, TSerializedValue, TValueType>(
        port: IOutput<TValue, TValueType>
    ): IOutputSerialized<TValueType>;
    private getSerializedPort<
        TValue,
        TSerializedValue,
        TValueType,
        TPortSerialized extends IInputSerialized<TSerializedValue, TValueType> | IOutputSerialized<TValueType>
    >(port: IInput<TValue, TSerializedValue, TValueType> | IOutput<TValue, TValueType>): TPortSerialized {
        const value = 'valueSerializer' in port ? port.valueSerializer(port.value) : undefined;
        const defaultValue = 'valueSerializer' in port ? port.valueSerializer(port.defaultValue) : undefined;

        return Object.assign(
            {},
            {
                id: port.id,
                name: port.name,
                type: port.type,
                value,
                defaultValue
            }
        ) as TPortSerialized;
    }

    /** Extracts serialized state from ports */
    private getSerializedPorts(ports: INode[Extract<keyof INode, 'inputs' | 'outputs'>]) {
        const serialized: Record<string, IInputSerialized<unknown, unknown> | IOutputSerialized<unknown>> = {};

        for (const [key, port] of Object.entries(ports)) {
            const serializedPort = this.getSerializedPort(port);
            serialized[key] = serializedPort;
        }

        return serialized;
    }

    /** Sets the name of the Node */
    public name(value: string) {
        return this.addField('name', value);
    }

    /** Defines an input on the Node */
    public input<TName extends PropertyKey, TValue, TSerializedValue, TValueType>(
        name: TName,
        inputProps: IInputProps<TValue, TSerializedValue, TValueType>
    ) {
        const props = defaults<
            IInputProps<TValue, TSerializedValue, TValueType>,
            Pick<IInput<TValue, TSerializedValue, TValueType>, 'validator'>
        >(inputProps, {
            validator: (value: unknown): value is TValue => true
        });

        props.value = typeof props.value === 'undefined' ? props.defaultValue : props.value;

        return this.definePort(name, this.getPortFromProps(props), 'inputs');
    }

    /** Defines an output on the Node */
    public output<TName extends PropertyKey, TValue, TValueType>(
        name: TName,
        outputProps: IOutputPropsInitializer<TValue, TValueType, TNode>
    ) {
        const props = outputProps(this.node);
        return this.definePort(name, this.getPortFromProps(props), 'outputs');
    }
}
