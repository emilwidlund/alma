import { defMain, Sym, assign, vec4 } from '@thi.ng/shader-ast';
import { GLSLTarget, targetGLSL } from '@thi.ng/shader-ast-glsl';
import { ModelSpec, UniformValues } from '@thi.ng/webgl';
import { Context, INodeSerialized, Node } from '@usealma/graph';
import { isFunction } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';

import { DrawingSize, ICompiledUniforms, INodesCollection, IWebGLContextProps } from './WebGLContext.types';
import { WebGLContextNode } from '../../nodes/accessor/WebGLContextNode/WebGLContextNode';
import { CameraManager } from '../CameraManager/CameraManager';
import { TextureManager } from '../TextureManager/TextureManager';

export class WebGLContext extends Context<WebGLContextNode> {
    /** Canvas Element */
    public ctx: WebGL2RenderingContext;
    /** GLSL Target */
    public target: GLSLTarget = targetGLSL();
    /** Attributes */
    public varying!: Record<string, Sym<any>>;
    /** Uniforms */
    public uniforms!: ICompiledUniforms;
    /** WebGL Model Spec */
    public model!: ModelSpec;
    /** Texture Manager */
    public textureManager: TextureManager;
    /** Camera Manager */
    public cameraManager: CameraManager;
    /** Nodes Collection to resolve from */
    public nodesCollection: INodesCollection;
    /** On Frame End Callback */
    public onFrameEnd?: () => void;

    constructor(ctx: WebGL2RenderingContext, props: IWebGLContextProps) {
        super(props);

        this.ctx = ctx;
        this.textureManager = new TextureManager(this, props.textureManager);
        this.cameraManager = new CameraManager(this, props.cameraManager);
        this.nodesCollection = props.nodesCollection;
        this.onFrameEnd = props.onFrameEnd;
        // @ts-ignore
        this.root = null;

        makeObservable(this, {
            root: observable,
            size: computed,
            setUniform: action
        });
    }

    /** Drawing Buffer Size */
    public get size(): DrawingSize {
        return {
            width: this.ctx.drawingBufferWidth,
            height: this.ctx.drawingBufferHeight
        };
    }

    /** Sets uniform by key & value */
    public setUniform<TKey extends keyof UniformValues>(key: TKey, value: UniformValues[TKey]): void {
        this.model.uniforms![key] = value;
    }

    /** Compiles WebGL Graph */
    public compileGraph(
        gl: GLSLTarget,
        uniforms: Record<string, Sym<any>>,
        ins: Record<string, Sym<any>>,
        outs: Record<string, Sym<any>>
    ) {
        this.varying = ins;
        this.uniforms = uniforms as unknown as ICompiledUniforms;

        const value = this.root ? this.root.resolveValue(this.root.inputs.color.value) : vec4(0, 0, 0, 1);

        return [defMain(() => [assign(outs.fragColor, isFunction(value) ? value() : value)])];
    }

    /** Resolve Root Node */
    public resolveRootNode(nodes: Node[]): WebGLContextNode {
        const root = nodes.find(node => node instanceof WebGLContextNode) as WebGLContextNode | undefined;

        if (!root) {
            const root = new WebGLContextNode(this);
            this.add(root);

            return root;
        }

        return root;
    }

    /** Resolves Node */
    public resolveNode<TWebGLNode>(nodeProps: INodeSerialized): TWebGLNode {
        const constructor = this.nodesCollection[nodeProps.type];

        if (!constructor) {
            throw new Error(`Node with type ${nodeProps.type} could not be resolved`);
        }

        return new constructor(this, nodeProps) as TWebGLNode;
    }

    /** Disposes Context */
    public dispose(): this {
        this.cameraManager?.dispose();

        return this;
    }
}
