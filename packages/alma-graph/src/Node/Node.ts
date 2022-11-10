import { Type } from '@thi.ng/shader-ast';
import { defaultsDeep, lowerCase, startCase } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { v4 as uuid } from 'uuid';

import { Connection } from '../Connection/Connection';
import { Context } from '../Context/Context';
import { Input } from '../Input/Input';
import { ComputedInputValue, IInputSerialized, InputValue, SerializableInputValue } from '../Input/Input.types';
import { Output } from '../Output/Output';
import { IOutputSerialized } from '../Output/Output.types';
import { INodeData, INodeInputs, INodeOutputs, INodePosition, INodeProps, INodeSerialized } from './Node.types';

export abstract class Node {
    /** Associated Context */
    public context: Context;
    /** Unique Identifier */
    public id: string;
    /** Node Name */
    public name: string;
    /** Node Type */
    public abstract type: string;
    /** Node Inputs */
    public abstract inputs: INodeInputs;
    /** Node Outputs */
    public abstract outputs: INodeOutputs;
    /** Node Data */
    public data: INodeData;

    constructor(context: Context, props: INodeProps) {
        this.context = context;

        const { id, name, data } = defaultsDeep(props, {
            id: uuid(),
            name: startCase(lowerCase(this.constructor.name)),
            inputs: {},
            outputs: {},
            data: {
                position: {
                    x: 0,
                    y: 0
                }
            }
        }) as Required<INodeProps>;

        this.id = id;
        this.name = name;
        this.data = data;

        makeObservable(this, {
            id: observable,
            name: observable,
            data: observable,
            ports: computed,
            setPosition: action
        });
    }

    /** Resolves a value from given port */
    public resolveValue<TType extends Type, T extends InputValue<TType>>(
        value: T
    ): SerializableInputValue<TType> | ComputedInputValue<TType> {
        if (value instanceof Output) {
            const output = value;
            return output.value;
        } else {
            return value;
        }
    }

    /** Associated ports */
    public get ports() {
        return [...Object.values(this.inputs), ...Object.values(this.outputs)];
    }

    /** Associated connections */
    public get connections(): Connection<any>[] {
        return this.ports
            .flatMap(port => (port instanceof Input ? [port.connection] : port.connections))
            .filter((connection): connection is Connection<any> => Boolean(connection));
    }

    /** Sets Position in Node Data */
    public setPosition(position: INodePosition) {
        this.data.position = position;
    }

    /** Serializes Node */
    public toJSON(): INodeSerialized {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            data: this.data,
            inputs: this.inputs as Record<string, IInputSerialized<any>>,
            outputs: this.outputs as Record<string, IOutputSerialized<any>>
        };
    }
}
