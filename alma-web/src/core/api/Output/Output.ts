import { Port } from '../Port/Port';
import type { Connection } from '../Connection/Connection';
import type { Input } from '../Input/Input';
import type { Node } from '../Node/Node';
import type { IOutputProps } from './Output.types';

export abstract class Output<
    TValueType = unknown,
    TValue = unknown,
    TSerializedValue = unknown,
    TNode extends Node = Node
> extends Port<TValueType, TValue, TSerializedValue, IOutputProps<TSerializedValue, TValueType>, TNode> {
    /** Connects output with a given input */
    public connect<TInput extends Input>(input: TInput): Connection<this, TInput> {
        return this.node.context.connect(this, input);
    }
}
