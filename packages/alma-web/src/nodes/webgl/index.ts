import { TimeNode } from './core/TimeNode/TimeNode';
import { UVNode } from './core/UVNode/UVNode';
import { WebGLContextNode } from './core/WebGLContextNode/WebGLContextNode';
import { SimplexNoiseNode } from './noise/SimplexNoiseNode/SimplexNoiseNode';

export enum WebGLNodeType {
    WEBGL_CONTEXT = 'WEBGL_CONTEXT',
    SIMPLEX_NOISE = 'SIMPLEX_NOISE',
    TIME = 'TIME',
    UV = 'UV'
}

export interface ClassConstructor<T> {
    new (...args: any[]): T;
}

export interface IWebGLNodeCollection {
    [key: string]: ClassConstructor<WebGLNode>;
    [WebGLNodeType.WEBGL_CONTEXT]: ClassConstructor<WebGLContextNode>;
    [WebGLNodeType.SIMPLEX_NOISE]: ClassConstructor<SimplexNoiseNode>;
    [WebGLNodeType.TIME]: ClassConstructor<TimeNode>;
    [WebGLNodeType.UV]: ClassConstructor<UVNode>;
}

export const nodes: IWebGLNodeCollection = {
    [WebGLNodeType.WEBGL_CONTEXT]: WebGLContextNode,
    [WebGLNodeType.SIMPLEX_NOISE]: SimplexNoiseNode,
    [WebGLNodeType.TIME]: TimeNode,
    [WebGLNodeType.UV]: UVNode
};

export type WebGLNode = WebGLContextNode | SimplexNoiseNode | TimeNode | UVNode;
