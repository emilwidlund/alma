import { defaults } from 'lodash';
import { makeObservable, observable } from 'mobx';

import { Input } from '../../../core/api/Input/Input';
import { Output } from '../../../core/api/Output/Output';
import { ValueType } from '../../lib/types';
import type { Node } from '../../../core/api/Node/Node';
import type {
    INumberInputProps,
    INumberInputSerialized,
    INumberOutputProps,
    INumberOutputSerialized
} from './NumberPort.types';

export class NumberInput<TNode extends Node> extends Input<ValueType, number, number, TNode> {
    type = ValueType.NUMBER;

    /** Min Number */
    @observable
    min: number;

    /** Max Number */
    @observable
    max: number;

    /** Step Amount */
    @observable
    step: number;

    constructor(node: TNode, props: INumberInputProps) {
        super(node, props);

        const { min, max, step } = defaults(props, {
            min: 0,
            max: 1,
            step: 0.01
        });

        this.min = min;
        this.max = max;
        this.step = step;

        makeObservable(this);
    }

    public valueSerializer(value: number): number {
        return value;
    }

    public valueReviver(serializedValue: number): number {
        return serializedValue;
    }

    /** Serializes the Node */
    public toJSON(): INumberInputSerialized {
        return {
            ...super.toJSON(),
            min: this.min,
            max: this.max,
            step: this.step
        };
    }
}

export class NumberOutput<TNode extends Node> extends Output<ValueType, number, number, TNode> {
    type = ValueType.NUMBER;

    /** Min Number */
    @observable
    min: number;

    /** Max Number */
    @observable
    max: number;

    /** Step Amount */
    @observable
    step: number;

    constructor(node: TNode, props: INumberOutputProps) {
        super(node, props);

        const { min, max, step } = defaults(props, {
            min: 0,
            max: 1,
            step: 0.01
        });

        this.min = min;
        this.max = max;
        this.step = step;

        makeObservable(this);
    }

    public valueSerializer(value: number): number {
        return value;
    }

    public valueReviver(serializedValue: number): number {
        return serializedValue;
    }

    /** Serializes the Node */
    public toJSON(): INumberOutputSerialized {
        return {
            ...super.toJSON(),
            min: this.min,
            max: this.max,
            step: this.step
        };
    }
}
