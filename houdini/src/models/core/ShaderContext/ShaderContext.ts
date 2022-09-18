import { Sym } from '@thi.ng/shader-ast';
import { BaseNode } from '../../nodes/BaseNode/BaseNode';
import { ShaderFunction } from './ShaderContext.types';

export class ShaderContext {
    /** Root Node */
    root: BaseNode<'vec3'>;
    /** Shader Functions */
    functions: Map<string, ShaderFunction> = new Map();
    /** Shader Attributes */
    attributes: Map<string, Sym<any>> = new Map();
    /** Shader Uniforms */
    uniforms: Map<string, Sym<any>> = new Map();

    constructor(root: BaseNode<'vec3'>) {
        this.root = root;
    }

    build() {
        return this.root.build(this);
    }
}
