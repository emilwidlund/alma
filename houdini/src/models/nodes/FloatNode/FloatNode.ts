import { float, Lit } from '@thi.ng/shader-ast';
import { ShaderContext } from '../../core/ShaderContext/ShaderContext';
import { ValueNode } from '../ValueNode/ValueNode';

export class FloatNode extends ValueNode<number, 'float'> {
    /** Float Value */
    value: number;

    constructor(value: number) {
        super();

        this.value = value;
    }

    get output(): Lit<'float'> {
        return float(this.value);
    }

    build(context: ShaderContext): this {
        return this;
    }
}
