import { assign, defMain, Sym, TaggedFn0, vec4 } from '@thi.ng/shader-ast';
import { GLSLVersion, targetGLSL } from '@thi.ng/shader-ast-glsl';
import { defShader, Shader as WebGLShader } from '@thi.ng/webgl';
import { ShaderContext } from '../ShaderContext/ShaderContext';
import { ShaderFunction } from '../ShaderContext/ShaderContext.types';

export class Shader {
    constructor(context: ShaderContext) {
        // const webGLShader = this.build(context);

        console.log(
            targetGLSL({
                type: 'fs',
                version: GLSLVersion.GLES_300
            })(context.root.output)
        );
    }

    private generateFunctionDefinitions(context: ShaderContext): ShaderFunction[] {
        return Array.from(context.functions.values());
    }

    private generateMainDefinition(context: ShaderContext, outs: Record<string, Sym<any>>): TaggedFn0<'void'> {
        return defMain(() => [assign(outs.fragColor, context.root.output)]);
    }

    /* public build(context: ShaderContext): WebGLShader {
        const functionDefinitions = this.generateFunctionDefinitions(context);

        return defShader(context.gl, {
            vs: (gl, _, attribs) => [defMain(() => [assign(gl.gl_Position, vec4(attribs.position, 0, 1))])],
            fs: (gl, uniforms, _, outs) => [...functionDefinitions, this.generateMainDefinition(context, outs)],
            attribs: {},
            uniforms: {}
        });
    } */
}
