import { action, autorun, computed, IReactionDisposer, makeObservable, observable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { defaults } from 'lodash';

import type { Context } from '../Context/Context';
import type { IConnectionProps } from './Connection.types';
import type { Output } from '../Output/Output';
import type { Input } from '../Input/Input';

export class Connection<TOutput extends Output, TInput extends Input> {
    /** Uniqiue Identifier */
    @observable
    id: string;

    /** Associated Context */
    @observable
    context: Context;

    /** Output */
    @observable
    output: Output;

    /** Input */
    @observable
    input: Input;

    /** Flag which indicates if the connection has been disposed or not */
    @observable
    alive: boolean;

    /** Connection Reaction */
    private reactionDisposer: IReactionDisposer;

    constructor(context: Context, output: TOutput, input: TInput, props?: IConnectionProps) {
        const { id } = defaults(props, {
            id: uuid()
        });

        this.id = id;
        this.context = context;
        this.output = output;
        this.input = input;

        this.validate(output, input);

        this.reactionDisposer = autorun(() => {
            // @ts-ignore
            this.input.setValue(this.output.value);
        });

        makeObservable(this);

        this.alive = true;
    }

    /** Validates connection */
    private validate(output: Output, input: Input): void {
        if (input.connected) {
            throw new Error(`Input with identifier ${input.id} is already connected`);
        }

        if (output.type !== input.type) {
            throw new Error(
                `Output with identifier ${output.id} has an incompatible value type with input with identifier ${input.id}`
            );
        }

        if (output.node.id === input.node.id) {
            throw new Error(`Output and Input may not share the same associated node`);
        }
    }

    /** The transported value type */
    @computed
    public get valueType(): TOutput['type'] {
        return this.output.type;
    }

    /** Dispose connection reaction */
    @action
    public dispose(): void {
        this.reactionDisposer();

        // @ts-ignore
        this.input.setValue(this.input.defaultValue);

        this.alive = false;
    }

    /** Serializes the Connection */
    public toJSON(): IConnectionProps {
        return {
            id: this.id,
            outputId: this.output.id,
            inputId: this.input.id
        };
    }
}
