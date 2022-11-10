import { defMain, Sym, assign } from '@thi.ng/shader-ast';
import { GLSLTarget } from '@thi.ng/shader-ast-glsl';
import { Context, IContextProps, INodeSerialized, Node } from 'alma-graph';

import { nodes } from '../../../nodes/webgl';
import { WebGLContextNode } from '../../../nodes/webgl/core/WebGLContextNode/WebGLContextNode';
import { IUniforms } from './WebGLContext.types';

export class WebGLContext extends Context<WebGLContextNode> {
    /** Canvas Element */
    public canvas: HTMLCanvasElement;
    /** GLSL Target */
    public target: GLSLTarget;
    /** Uniforms */
    public uniforms: IUniforms;

    constructor(canvas: HTMLCanvasElement, target: GLSLTarget, uniforms: IUniforms, props: IContextProps = {}) {
        super(props);

        console.log(props);

        this.canvas = canvas;
        this.target = target;
        this.uniforms = uniforms;
    }

    resolveRootNode(nodes: Node[]): WebGLContextNode {
        const root = nodes.find(node => node instanceof WebGLContextNode) as WebGLContextNode | undefined;

        if (!root) {
            const root = new WebGLContextNode(this);
            this.add(root);

            return root;
        }

        return root;
    }

    resolveNode<TWebGLNode>(nodeProps: INodeSerialized) {
        const constructor = nodes[nodeProps.type];

        if (!constructor) {
            throw new Error(`Node with type ${nodeProps.type} could not be resolved`);
        }

        return new constructor(this, nodeProps) as TWebGLNode;
    }

    /** Render Context */
    public render(outs: Record<string, Sym<any>>) {
        const value = this.root.resolveValue(this.root.inputs.color.value);

        return [defMain(() => [assign(outs.fragColor, 'args' in value ? value() : value)])];
    }
}
