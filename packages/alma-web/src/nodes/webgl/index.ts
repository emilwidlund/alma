import { TimeNode } from './core/TimeNode/TimeNode';
import { UVNode } from './core/UVNode/UVNode';
import { WebGLContextNode } from './core/WebGLContextNode/WebGLContextNode';
import { ModuloNode } from './math/ModuloNode/ModuloNode';
import { SineNode } from './math/SineNode/SineNode';
import { Vector2Node } from './math/Vector2Node/Vector2Node';
import { SimplexNoiseNode } from './noise/SimplexNoiseNode/SimplexNoiseNode';
import { ClassConstructor, WebGLNodeType } from './types';

export interface IWebGLNodeCollection {
    [key: string]: ClassConstructor<WebGLNode>;
    [WebGLNodeType.WEBGL_CONTEXT]: ClassConstructor<WebGLContextNode>;
    [WebGLNodeType.SIMPLEX_NOISE]: ClassConstructor<SimplexNoiseNode>;
    [WebGLNodeType.SINE]: ClassConstructor<SineNode>;
    [WebGLNodeType.MODULO]: ClassConstructor<ModuloNode>;
    [WebGLNodeType.TIME]: ClassConstructor<TimeNode>;
    [WebGLNodeType.UV]: ClassConstructor<UVNode>;
    [WebGLNodeType.VECTOR_2]: ClassConstructor<Vector2Node>;
}

export const nodes: IWebGLNodeCollection = {
    [WebGLNodeType.WEBGL_CONTEXT]: WebGLContextNode,
    [WebGLNodeType.SIMPLEX_NOISE]: SimplexNoiseNode,
    [WebGLNodeType.SINE]: SineNode,
    [WebGLNodeType.MODULO]: ModuloNode,
    [WebGLNodeType.TIME]: TimeNode,
    [WebGLNodeType.UV]: UVNode,
    [WebGLNodeType.VECTOR_2]: Vector2Node
};

export type WebGLNode = WebGLContextNode | SimplexNoiseNode | SineNode | ModuloNode | TimeNode | UVNode | Vector2Node;
