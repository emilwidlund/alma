import { Type } from '@thi.ng/shader-ast';
import { makeObservable, computed } from 'mobx';

import { Input } from '../Input/Input';
import { Node } from '../Node/Node';
import { Port } from '../Port/Port';
import { IOutputProps, OutputValue } from './Output.types';

export class Output<TType extends Type, TNode extends Node> extends Port<TType, TNode> {
    /** Computed Value */
    value!: OutputValue<TType>;

    constructor(node: TNode, props: IOutputProps<TType>) {
        super(node, props);

        Object.defineProperty(this, 'value', {
            enumerable: true,
            configurable: true,
            get: props.value
        });

        makeObservable(this, {
            value: computed
        });
    }

    /** Connects output with input */
    public connect<TInputNode extends Node, TInput extends Input<TType, TInputNode>>(input: TInput) {
        this.node.artboard.connect(this, input);
    }
}
