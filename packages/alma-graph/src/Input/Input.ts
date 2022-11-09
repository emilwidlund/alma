import { Type } from '@thi.ng/shader-ast';
import { makeObservable, observable } from 'mobx';

import { Node } from '../Node/Node';
import { Port } from '../Port/Port';
import { IInputProps, IInputSerialized, InputValue, SerializableInputValue, ValidatorFunction } from './Input.types';

export class Input<TType extends Type, TNode extends Node> extends Port<TType, TNode> {
    /** Port Default Value */
    public defaultValue: SerializableInputValue<TType>;
    /** Port Value */
    public value: InputValue<TType>;
    /** Port Validator */
    public validator: ValidatorFunction<InputValue<TType>>;

    constructor(node: TNode, props: IInputProps<TType>) {
        super(node, props);

        this.defaultValue = props.defaultValue;
        this.value = props.value || this.defaultValue;
        this.validator = props.validator || ((value: unknown): value is InputValue<TType> => true);

        makeObservable(this, {
            defaultValue: observable.ref,
            value: observable.ref
        });
    }

    /** Serializes Port */
    public toJSON(): IInputSerialized<TType> {
        return {
            ...super.toJSON(),
            value:
                'tag' in this.value && this.value.tag === 'lit'
                    ? (this.value as SerializableInputValue<TType>)
                    : undefined
        };
    }
}
