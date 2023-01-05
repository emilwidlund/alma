import { assign, defMain, Sym, vec4 } from '@thi.ng/shader-ast';
import { GLSLTarget } from '@thi.ng/shader-ast-glsl';
import { ShaderFn } from '@thi.ng/webgl';

import { Circuit } from '../../models/graph/Circuit/Circuit.types';
import { Input, InputValue } from '../../models/graph/Input/Input.types';
import { Output, OutputValue } from '../../models/graph/Output/Output.types';

export const resolveValue = (value: Input | Output | InputValue | OutputValue): InputValue | OutputValue => {
    if ('id' in value) {
        const port = value;
        return resolveValue(port.value);
    } else if (typeof value === 'function') {
        return value();
    } else {
        return value;
    }
};

export const compileCircuit = (circuit: Circuit): ShaderFn => {
    return (
        gl: GLSLTarget,
        uniforms: Record<string, Sym<any>>,
        ins: Record<string, Sym<any>>,
        outs: Record<string, Sym<any>>
    ) => {
        circuit.uniforms = uniforms;

        const value = circuit.root ? resolveValue(circuit.root.inputs.color.value) : vec4(0, 0, 0, 1);

        return [defMain(() => [assign(outs.fragColor, typeof value === 'function' ? value() : value)])];
    };
};
