import { Lit, vec3 } from '@thi.ng/shader-ast';
import { ShaderContext } from '../../core/ShaderContext/ShaderContext';
import { ValueNode } from '../ValueNode/ValueNode';

export class Vector3Node extends ValueNode<[number, number, number], 'vec3'> {
    /** Vector3 Value */
    value: [number, number, number];

    constructor(x: number, y: number, z: number) {
        super();

        this.value = [x, y, z];
    }

    get output(): Lit<'vec3'> {
        const [x, y, z] = this.value;

        return vec3(x, y, z);
    }

    build(context: ShaderContext): this {
        return this;
    }
}
