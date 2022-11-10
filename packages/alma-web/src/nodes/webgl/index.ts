import { TimeNode } from './core/TimeNode/TimeNode';
import { UVNode } from './core/UVNode/UVNode';
import { WebGLContextNode } from './core/WebGLContextNode/WebGLContextNode';
import { ModuloNode } from './math/ModuloNode/ModuloNode';
import { SimplexNoiseNode } from './noise/SimplexNoiseNode/SimplexNoiseNode';
import { ClassConstructor, WebGLNodeType } from './types';

export interface IWebGLNodeCollection {
    [key: string]: ClassConstructor<WebGLNode>;
    [WebGLNodeType.WEBGL_CONTEXT]: ClassConstructor<WebGLContextNode>;
    [WebGLNodeType.SIMPLEX_NOISE]: ClassConstructor<SimplexNoiseNode>;
    [WebGLNodeType.MODULO]: ClassConstructor<ModuloNode>;
    [WebGLNodeType.TIME]: ClassConstructor<TimeNode>;
    [WebGLNodeType.UV]: ClassConstructor<UVNode>;
}

export const nodes: IWebGLNodeCollection = {
    [WebGLNodeType.WEBGL_CONTEXT]: WebGLContextNode,
    [WebGLNodeType.SIMPLEX_NOISE]: SimplexNoiseNode,
    [WebGLNodeType.MODULO]: ModuloNode,
    [WebGLNodeType.TIME]: TimeNode,
    [WebGLNodeType.UV]: UVNode
};

export type WebGLNode = WebGLContextNode | SimplexNoiseNode | ModuloNode | TimeNode | UVNode;
