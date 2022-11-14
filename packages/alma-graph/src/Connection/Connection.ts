import { Type } from '@thi.ng/shader-ast';
import { defaults } from 'lodash';
import { IReactionDisposer, autorun, computed, makeObservable, observable } from 'mobx';
import { v4 as uuid } from 'uuid';

import { Context } from '../Context/Context';
import { Input } from '../Input/Input';
import { InputValue, SerializableInputValue } from '../Input/Input.types';
import { Node } from '../Node/Node';
import { Output } from '../Output/Output';
import { IConnectionProps, IConnectionSerialized } from './Connection.types';

export class Connection<TType extends Type> {
    /** Unique Identifier */
    public id: string;
    /** Associated Artboard */
    public context: Context;
    /** From Output */
    public from: Output<TType, Node>;
    /** To Input */
    public to: Input<TType, Node>;
    /** Previous Input Value */
    public previousInputValue: InputValue<TType>;

    /** Reaction Disposer */
    private reactionDisposer: IReactionDisposer;

    constructor(context: Context, props: IConnectionProps<TType>) {
        const { id } = defaults(props, {
            id: uuid()
        });

        this.id = id;
        this.context = context;
        this.from = props.from;
        this.to = props.to;
        this.previousInputValue = props.to.value;

        makeObservable(this, {
            id: observable,
            from: observable,
            to: observable,
            type: computed
        });

        this.reactionDisposer = autorun(() => {
            if (this.to.validator(this.from.value)) {
                this.to.value = this.from;
            } else {
                throw new Error(`Validation of value from Output ${this.from.id} to Input ${this.to.id} failed`);
            }
        });
    }

    /** Connection Value Type */
    get type(): TType {
        return this.from.type;
    }

    /** Disposes Connection */
    public dispose(): void {
        this.reactionDisposer();

        this.to.setValue(this.previousInputValue as SerializableInputValue<TType>);
    }

    /** Serializes Connection */
    public toJSON(): IConnectionSerialized<TType> {
        return {
            id: this.id,
            from: this.from.id,
            to: this.to.id
        };
    }
}
