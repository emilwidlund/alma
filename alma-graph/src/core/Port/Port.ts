import { Type } from '@thi.ng/shader-ast';
import { makeObservable, observable, IReactionDisposer, computed } from 'mobx';
import { v4 as uuid } from 'uuid';

import { Node } from '../Node/Node';
import { IPortProps, IPortSerialized } from './Port.types';

export class Port<TType extends Type, TNode extends Node> {
    /** Unique Identifier */
    public id: string;
    /** Associated Node */
    public node: TNode;
    /** Port Name */
    public name: string;
    /** Port Value Type */
    public type: TType;

    /** Value Reaction Disposer */
    private reactionDisposer?: IReactionDisposer;

    constructor(node: TNode, props: IPortProps<TType>) {
        this.node = node;
        this.id = props.id || uuid();
        this.name = props.name;
        this.type = props.type;

        makeObservable(this, {
            id: observable,
            node: observable,
            name: observable,
            type: observable,
            connected: computed
        });
    }

    /** Indicates if Port is connected */
    get connected(): boolean {
        let isConnected = false;

        this.node.artboard.connections.forEach(connection => {
            if (connection.from.id === this.id || connection.to.id === this.id) {
                isConnected = true;
            }
        });

        return isConnected;
    }

    /** Disposes internal reactions */
    public dispose(): void {
        if (this.reactionDisposer) {
            this.reactionDisposer();
        }
    }

    /** Serializes Port */
    public toJSON(): IPortSerialized<TType> {
        return {
            id: this.id,
            name: this.name,
            type: this.type
        };
    }
}
