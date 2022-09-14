import { Sym, TaggedFn0 } from '@thi.ng/shader-ast';
import { GLSLTarget } from '@thi.ng/shader-ast-glsl';
import { ShaderFunction } from './ShaderContext.types';

export class ShaderContext {
    /** Associated GL Context */
    gl: GLSLTarget;
    /** Shader Functions */
    functions: Map<string, ShaderFunction> = new Map();
    /** Shader Attributes */
    attributes: Map<string, Sym<any>> = new Map();
    /** Shader Uniforms */
    uniforms: Map<string, Sym<any>> = new Map();

    constructor(gl: GLSLTarget) {
        this.gl = gl;
    }
}
