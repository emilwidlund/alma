import { defaults } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { v4 as uuid } from 'uuid';

import type { IPortProps, IPortSerialized } from './Port.types';
import type { Connection } from '../Connection/Connection';
import type { Node } from '../Node/Node';
import { Input } from '../Input/Input';
import { Output } from '../Output/Output';

export abstract class Port<
    TValueType,
    TValue,
    TSerializedValue,
    TProps extends IPortProps<TSerializedValue, TValueType>,
    TNode extends Node
> {
    /** Associated Node */
    @observable
    node: TNode;

    /** Unique Identifier */
    @observable
    id: string;

    /** Port's Name */
    @observable
    name: string;

    /** Port's Type */
    @observable
    abstract type: TValueType;

    /** Port's Default Value */
    @observable
    defaultValue: TValue;

    /** Port's Value */
    @observable
    value: TValue;

    constructor(node: TNode, props: TProps) {
        const { id, name, defaultValue, value } = defaults(props, {
            id: uuid(),
            name: 'Untitled'
        });

        this.node = node;
        this.id = id;
        this.name = name;
        this.defaultValue = this.valueReviver(defaultValue);
        this.value = value ? this.valueReviver(value) : this.defaultValue;

        makeObservable(this);
    }

    /** Associated connections */
    @computed
    get connections(): Connection<Output, Input>[] {
        return this.node.connections.filter(
            connection => connection.input.id === this.id || connection.output.id === this.id
        );
    }

    /** Indicates if port is connected or not */
    @computed
    get connected(): boolean {
        return !!this.connections.length;
    }

    /** Returns a serialized value from proper value */
    abstract valueSerializer(value: TValue): TSerializedValue;

    /** Returns a proper value from serialized state */
    abstract valueReviver(serializedValue: TSerializedValue): TValue;

    /** Sets the port's name */
    @action
    public setName(name: string) {
        this.name = name;
    }

    /** Sets the port's value */
    @action
    public setValue(value: TValue) {
        this.value = value;
    }

    /** Serializes the Port */
    public toJSON(): IPortSerialized<TSerializedValue, TValueType> {
        return {
            id: this.id,
            name: this.name,
            defaultValue: this.valueSerializer(this.defaultValue),
            value: this.valueSerializer(this.value),
            type: this.type
        };
    }
}
