import { assign, defMain, Sym, Type, uniform, vec4 } from '@thi.ng/shader-ast';
import { GLSLTarget, GLSLVersion, targetGLSL } from '@thi.ng/shader-ast-glsl';
import { ShaderFn, UniformValues } from '@thi.ng/webgl';
import { Context, INodeSerialized, InputValue, Node, Output, OutputValue } from '@usealma/graph';
import { action, makeObservable, observable } from 'mobx';

import { RendererNode } from '../../nodes/accessor/RendererNode/RendererNode';
import { CameraManager } from '../CameraManager/CameraManager';
import { TextureManager } from '../TextureManager/TextureManager';
import { INodesCollection, ICircuitProps, ICompiledUniforms } from './Circuit.types';

export class Circuit extends Context<RendererNode> {
    /** Canvas Element */
    public ctx: WebGL2RenderingContext;
    /** GLSL Target */
    public target: GLSLTarget;
    /** Texture Manager */
    public textureManager: TextureManager;
    /** Camera Manager */
    public cameraManager: CameraManager;
    /** Nodes Collection to resolve from */
    public nodesCollection: INodesCollection;
    /** Compiled Fragment Shader */
    public fragment: string;
    /** Associated Uniforms */
    public uniforms: ICompiledUniforms;

    constructor(ctx: WebGL2RenderingContext, props: ICircuitProps) {
        super(props);

        this.ctx = ctx;
        this.target = targetGLSL({ version: GLSLVersion.GLES_300 });
        this.textureManager = new TextureManager(this, props.textureManager);
        this.cameraManager = new CameraManager(this, props.cameraManager);
        this.nodesCollection = props.nodesCollection;
        this.uniforms = {
            resolution: uniform('vec2', 'resolution'),
            time: uniform('float', 'time'),
            mouse: uniform('vec2', 'mouse'),
            previousTexture: uniform('sampler2D', 'previousTexture'),
            cameraTexture: uniform('sampler2D', 'cameraTexture')
        };
        this.root = this.initialize();
        this.fragment = '';

        makeObservable(this, {
            root: observable,
            fragment: observable,
            setFragment: action
        });
    }

    /** Sets uniform by key & value */
    public setUniform<TKey extends keyof UniformValues>(key: TKey, value: UniformValues[TKey]): void {
        this.uniforms![key] = value;
    }

    /** Sets the fragment */
    public setFragment(fragment: string) {
        this.fragment = fragment;
    }

    /** Resolve Root Node */
    public resolveRootNode(nodes: Node[]): RendererNode {
        const root = nodes.find((node): node is RendererNode => node instanceof RendererNode);

        if (!root) {
            const root = new RendererNode(this);
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
}

export const resolveValue = <T extends Type>(value: InputValue<T>): OutputValue<T> => {
    if (value instanceof Output) {
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
        circuit.uniforms = uniforms as ICompiledUniforms;

        const value = circuit.root ? resolveValue(circuit.root.inputs.color.value) : vec4(0, 0, 0, 1);

        return [defMain(() => [assign(outs.fragColor, typeof value === 'function' ? value() : value)])];
    };
};
