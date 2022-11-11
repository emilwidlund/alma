import { defMain, Sym, assign, float } from '@thi.ng/shader-ast';
import { GLSLTarget } from '@thi.ng/shader-ast-glsl';
import { compileModel, defQuadModel, defShader, draw, FX_SHADER_SPEC, ModelSpec, UniformValues } from '@thi.ng/webgl';
import { Context, IContextProps, INodeSerialized, Node } from 'alma-graph';
import { action, computed, makeObservable, observable } from 'mobx';

import { nodes } from '../../../../nodes/webgl';
import { TimeNode } from '../../../../nodes/webgl/core/TimeNode/TimeNode';
import { UVNode } from '../../../../nodes/webgl/core/UVNode/UVNode';
import { WebGLContextNode } from '../../../../nodes/webgl/core/WebGLContextNode/WebGLContextNode';
import { ModuloNode } from '../../../../nodes/webgl/math/ModuloNode/ModuloNode';
import { SimplexNoiseNode } from '../../../../nodes/webgl/noise/SimplexNoiseNode/SimplexNoiseNode';
import { DrawingSize, ICompiledUniforms } from './WebGLContext.types';

export class WebGLContext extends Context<WebGLContextNode> {
    /** GLSL Target */
    public target!: GLSLTarget;
    /** Canvas Element */
    public canvas: HTMLCanvasElement;
    /** Uniforms */
    public uniforms!: ICompiledUniforms;
    /** WebGL Model Spec */
    public model: ModelSpec;
    /** Frame Id */
    public frameId?: number;
    /** Start Time */
    public startTime?: number;

    constructor(canvas: HTMLCanvasElement, props: IContextProps = {}) {
        super(props);

        this.canvas = canvas;
        this.root = this.initialize();
        this.model = this.createModel();

        this.setUniform('resolution', [this.size.width, this.size.height]);
        this.ctx.viewport(0, 0, this.size.width, this.size.height);

        makeObservable(this, {
            root: observable,
            model: observable,
            uniforms: observable,
            ctx: computed,
            size: computed,
            setUniform: action
        });
    }

    /** WebGL Context */
    public get ctx(): WebGLRenderingContext {
        const context = this.canvas.getContext('webgl');

        if (!context) {
            throw new Error('WebGL Context could not be initialized');
        }

        return context;
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

    /** Creates a WebGL Model */
    public createModel(): ModelSpec {
        const model = {
            ...defQuadModel({ uv: false }),
            shader: defShader(this.ctx, {
                ...FX_SHADER_SPEC,
                fs: this.compileGraph.bind(this),
                uniforms: {
                    resolution: ['vec2', [this.size.width, this.size.height]],
                    time: ['float', 0],
                    mouse: ['vec2', [0, 0]]
                }
            })
        };

        compileModel(this.ctx, model);

        return model;
    }

    /** Compiles WebGL Graph */
    private compileGraph(
        gl: GLSLTarget,
        uniforms: Record<string, Sym<any>>,
        _: Record<string, Sym<any>>,
        outs: Record<string, Sym<any>>
    ) {
        this.target = gl;
        this.uniforms = uniforms as unknown as ICompiledUniforms;

        const time = new TimeNode(this, { data: { position: { x: 60, y: 500 } } });
        const modulo = new ModuloNode(this, { data: { position: { x: 400, y: 500 } } });
        time.outputs.time.connect(modulo.inputs.a);
        modulo.inputs.b.value = float(2);

        const uv = new UVNode(this, { data: { position: { x: 120, y: 750 } } });
        const simplexNoise = new SimplexNoiseNode(this, { data: { position: { x: 800, y: 600 } } });

        this.root.data.position = { x: 1200, y: 600 };

        modulo.outputs.result.connect(simplexNoise.inputs.decay);

        uv.outputs.uv.connect(simplexNoise.inputs.uv);
        simplexNoise.outputs.output.connect(this.root.inputs.color);

        const value = this.root.resolveValue(this.root.inputs.color.value);

        return [defMain(() => [assign(outs.fragColor, 'args' in value ? value() : value)])];
    }

    /** Resolve Root Node */
    resolveRootNode(nodes: Node[]): WebGLContextNode {
        const root = nodes.find(node => node instanceof WebGLContextNode) as WebGLContextNode | undefined;

        if (!root) {
            const root = new WebGLContextNode(this);
            this.add(root);

            return root;
        }

        return root;
    }

    /** Resolves Node */
    resolveNode<TWebGLNode>(nodeProps: INodeSerialized): TWebGLNode {
        const constructor = nodes[nodeProps.type];

        if (!constructor) {
            throw new Error(`Node with type ${nodeProps.type} could not be resolved`);
        }

        return new constructor(this, nodeProps) as TWebGLNode;
    }

    /** Render Context */
    public render(): void {
        this.frameId = requestAnimationFrame(this.render.bind(this, this.model));

        if (!this.startTime) {
            this.startTime = Date.now();
        }

        const time = (Date.now() - this.startTime) * 0.001;
        this.setUniform('time', time);

        draw(this.model);
    }

    /** Disposes Context */
    public dispose(): void {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }
    }
}
