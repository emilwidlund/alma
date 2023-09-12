import { Input, Node } from '@nodl/core';
import { float, Lit, Prim } from '@thi.ng/shader-ast';

import { PrimSchema } from '../../../schemas/Prim/Prim';

export class ABPrimNode extends Node {
    name = 'ABPrimNode';

    inputs = {
        a: new Input<Lit<Prim>>({
            name: 'A',
            type: PrimSchema,
            defaultValue: float(0)
        }),
        b: new Input<Lit<Prim>>({
            name: 'B',
            type: PrimSchema,
            defaultValue: float(0)
        })
    };

    outputs = {};
}
