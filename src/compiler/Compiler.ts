import { assign, defMain, FLOAT0, FLOAT1, Sym, vec4 } from "@thi.ng/shader-ast";
import { GLSLVersion } from "@thi.ng/shader-ast-glsl";
import { ShaderFn, shaderSourceFromAST, ShaderSpec, ShaderUniformSpecs } from "@thi.ng/webgl";
import { Root } from "../nodes/common/Root/Root";

const createShaderSpec = (
    root: ShaderFn,
    uniforms?: ShaderUniformSpecs
): ShaderSpec => {
    return {
        vs: (gl, _, ins, outs) => [
            defMain(() => [assign(outs.vUv, ins.uv), assign(gl.gl_Position, vec4(ins.position, FLOAT0, FLOAT1))])
        ],
        fs: root,
        uniforms,
        attribs: { position: 'vec2', uv: 'vec2' },
        varying: { vUv: 'vec2' }
    };
};

export const compile = <TUniforms extends ShaderUniformSpecs>(root: Root, uniforms: TUniforms, target: GLSLVersion) => {
    const shaderSpec = createShaderSpec(root.resolve.bind(root), uniforms);
    
    return shaderSourceFromAST(shaderSpec, 'fs', target);
}