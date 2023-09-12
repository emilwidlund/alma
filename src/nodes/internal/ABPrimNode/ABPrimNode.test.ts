import { float, vec2 } from '@thi.ng/shader-ast';

import {ABPrimNode} from './ABPrimNode';

describe('AB Prim', () => {
    it('should initialize with correct values', () => {
        const abPrim = new ABPrimNode();

        expect(typeof abPrim.id).toEqual('string');
        expect(abPrim.name).toEqual('AB Prim Node');
        expect(abPrim.inputs.a).toBeDefined();
        expect(abPrim.inputs.b).toBeDefined();
        expect(abPrim.outputs).toEqual({});
    });
});
