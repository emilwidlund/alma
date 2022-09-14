import { float, Lit } from '@thi.ng/shader-ast';
import { ValueNode } from '~models/nodes/ValueNode/ValueNode';

export class FloatNode extends ValueNode<number, Lit<'float'>> {
    /** Float Value */
    value: number;

    constructor(value: number) {
        super();

        this.value = value;
    }

    get output(): Lit<'float'> {
        return float(this.value);
    }
}
