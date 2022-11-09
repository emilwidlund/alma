import { defaultsDeep } from 'lodash';
import { action, computed, makeObservable, observable, set } from 'mobx';
import { v4 as uuid } from 'uuid';
import 'reflect-metadata';

import type { NodeInputs, NodeOutputs, INodeProps, INodeData, INodeSerialized } from './Node.types';
import { getInputByProps, getOutputByProps } from '../utils';
import type { Connection } from '../Connection/Connection';
import type { Context } from '../Context/Context';
import type { Input } from '../Input/Input';
import type { IInputProps } from '../Input/Input.types';
import type { Output } from '../Output/Output';
import type { IOutputProps } from '../Output/Output.types';
import { IInput } from '../../../client/ports';
import { NumberInput } from '../../../client/ports/NumberPort/NumberPort';

export abstract class Node<
    TInputs extends NodeInputs = NodeInputs,
    TOutputs extends NodeOutputs = NodeOutputs,
    TData extends INodeData = INodeData,
    TSerialized extends INodeSerialized = INodeSerialized
> {
    /** Associated Context */
    @observable
    context: Context;

    /** Node Identifier */
    @observable
    id: string;

    /** Node Name */
    @observable
    name: string;

    /** Node Inputs */
    @observable
    inputs: TInputs;

    /** Node Outputs */
    @observable
    outputs: TOutputs;

    /** Node Data */
    @observable
    data: TData;

    /**
     * @param context Associated Context
     * @param props Node Properties
     */
    constructor(context: Context, props?: INodeProps<TSerialized>) {
        const { name, id, inputs, outputs, data } = defaultsDeep(props, {
            id: uuid(),
            name: this.constructor.name,
            data: {}
        });

        this.context = context;
        this.id = id;
        this.name = name;
        this.inputs = this.initializePorts<TInputs, IInputProps<unknown, unknown>>(getInputByProps, inputs);
        this.outputs = this.initializePorts<TOutputs, IOutputProps<unknown, unknown>>(getOutputByProps, outputs);
        this.data = data;

        this.context.add(this);

        makeObservable(this);
    }

    /** Associated connections */
    @computed
    get connections(): Connection<Output, Input>[] {
        return [...this.context.connections.values()].filter(
            connection => connection.input.node.id === this.id || connection.output.node.id === this.id
        );
    }

    /**
     * Initializes serialized ports
     * @param ports Serialized Ports
     */
    private initializePorts<TPorts, TProps extends IInputProps<unknown, unknown> | IOutputProps<unknown, unknown>>(
        retriever: (node: this, props: TProps) => Input | Output,
        ports?: Record<string, TProps>
    ): TPorts {
        const target = {} as TPorts;

        if (ports) {
            for (const [key, port] of Object.entries(ports)) {
                Object.defineProperty(target, key, {
                    value: retriever(this, port)
                });
            }
        }

        return target;
    }

    /** Populates an entry in the node's data */
    @action
    public setData<TKey extends keyof TData>(key: TKey, entry: TData[TKey]): void {
        set(this.data, key, entry);
    }

    /** Cleanup */
    public dispose(): void {
        for (const connection of this.connections) {
            this.context.disconnect(connection);
        }
    }

    /** Serializes the Node */
    public toJSON(): INodeSerialized {
        return {
            id: this.id,
            name: this.name,
            inputs: this.inputs,
            outputs: this.outputs,
            nodeConstructor: this.constructor.name,
            data: this.data
        };
    }
}
