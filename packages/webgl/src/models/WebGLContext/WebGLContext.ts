import { defMain, Sym, assign, vec4 } from '@thi.ng/shader-ast';
import { GLSLTarget, GLSLVersion, targetGLSL } from '@thi.ng/shader-ast-glsl';
import {
    compileModel,
    defQuadModel,
    defShader,
    draw,
    ModelSpec,
    PASSTHROUGH_VS_UV,
    shaderSourceFromAST,
    ShaderSpec,
    UniformValues
} from '@thi.ng/webgl';
import { Context, INodeSerialized, Node } from '@usealma/graph';
import { isFunction } from 'lodash';
import { action, computed, IReactionDisposer, makeObservable, observable, reaction } from 'mobx';

import { WebGLContextNode } from '../../nodes/accessor/WebGLContextNode/WebGLContextNode';
import { CameraManager } from '../CameraManager/CameraManager';
import { TextureManager } from '../TextureManager/TextureManager';
import { DrawingSize, ICompiledUniforms, INodesCollection, IWebGLContextProps } from './WebGLContext.types';

export class WebGLContext extends Context<WebGLContextNode> {
    /** Canvas Element */
    public ctx: WebGL2RenderingContext;
    /** GLSL Target */
    public target!: GLSLTarget;
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
    /** Compiled Fragment Shader */
    public fragment: string;
    /** Frame Id */
    public frameId?: number;
    /** Start Time */
    public startTime?: number;
    /** Internal Connection Reaction */
    public connectionReactionDisposer?: IReactionDisposer;
    /** On Frame End Callback */
    public onFrameEnd?: () => void;

    constructor(ctx: WebGL2RenderingContext, props: IWebGLContextProps) {
        super(props);

        this.ctx = ctx;
        this.textureManager = new TextureManager(this, props.textureManager);
        this.cameraManager = new CameraManager(this, props.cameraManager);
        this.nodesCollection = props.nodesCollection;
        this.onFrameEnd = props.onFrameEnd;
        this.model = this.createModel();
        this.root = this.initialize();
        this.fragment = '';

        makeObservable(this, {
            root: observable,
            fragment: observable,
            size: computed,
            setUniform: action,
            setFragment: action
        });

        this.setUniform('resolution', [this.size.width, this.size.height]);
        this.ctx.viewport(0, 0, this.size.width, this.size.height);

        this.render();
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

    /** Sets the fragment */
    public setFragment(fragment: string) {
        this.fragment = fragment;
    }

    /** Creates a WebGL Model */
    public createModel(): ModelSpec {
        const textureEntries = Array.from(this.textureManager.textures.entries());
        const textureUniforms = textureEntries.reduce((acc, [key, value], index) => {
            const resolutionKey = `${key}AspectRatio`;
            return { ...acc, [key]: ['sampler2D', index], [resolutionKey]: ['float', value.size[0] / value.size[1]] };
        }, {});
        const textures = Array.from(this.textureManager.textures.values());

        const shaderSpec: ShaderSpec = {
            vs: PASSTHROUGH_VS_UV,
            fs: this.compileGraph.bind(this),
            uniforms: {
                resolution: ['vec2', [this.size.width, this.size.height]],
                time: ['float', 0],
                mouse: ['vec2', [0, 0]],
                ...textureUniforms
            },
            attribs: { position: 'vec2', uv: 'vec2' },
            varying: { v_uv: 'vec2' }
        };

        const model: ModelSpec = {
            ...defQuadModel(),
            shader: defShader(this.ctx, shaderSpec),
            textures
        };

        this.setFragment(shaderSourceFromAST(shaderSpec, 'fs', GLSLVersion.GLES_300));

        compileModel(this.ctx, model);

        return model;
    }

    /** Compiles WebGL Graph */
    private compileGraph(
        gl: GLSLTarget,
        uniforms: Record<string, Sym<any>>,
        ins: Record<string, Sym<any>>,
        outs: Record<string, Sym<any>>
    ) {
        this.target = targetGLSL();
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

    /** Render Context */
    public async render(): Promise<void> {
        if (!this.frameId) {
            /** Reset entire context if connections are updated */
            this.connectionReactionDisposer = reaction(
                () => this.values,
                () => {
                    this.reset();
                },
                { delay: 100 }
            );

            this.model = this.createModel();

            this.setUniform('resolution', [this.size.width, this.size.height]);
            this.ctx.viewport(0, 0, this.size.width, this.size.height);
        }

        this.frameId = requestAnimationFrame(this.render.bind(this));

        if (!this.startTime) {
            this.startTime = Date.now();
        }

        const time = (Date.now() - this.startTime) * 0.001;
        this.setUniform('time', time);

        draw(this.model);

        this.onFrameEnd?.();
    }

    /** Disposes Context */
    public dispose(): this {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = undefined;
        }

        if (this.connectionReactionDisposer) {
            this.connectionReactionDisposer();
        }

        this.cameraManager?.dispose();

        return this;
    }

    /** Resets Context */
    public reset(): void {
        this.dispose().render();
    }
}
