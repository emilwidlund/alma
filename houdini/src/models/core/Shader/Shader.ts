import { assign, defMain, vec4 } from '@thi.ng/shader-ast';
import { defShader, Shader as WebGLShader } from '@thi.ng/webgl';
import { BaseNode } from '~models/nodes/BaseNode/BaseNode';

export class Shader<T> {
    constructor(gl: WebGL2RenderingContext, node: BaseNode<T>) {
        const webglShader = this.generate(gl, node);
    }

    generate(gl: WebGL2RenderingContext, node: BaseNode<T>): WebGLShader {
        return defShader(gl, {
            vs: (gl, _, attribs) => [defMain(() => [assign(gl.gl_Position, vec4(attribs.position, 0, 1))])],
            fs: (gl, uniforms, _, outs) => [],
            attribs: () => {},
            uniforms: () => {}
        });
    }
}
