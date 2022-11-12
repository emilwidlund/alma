import { TimeNode } from './nodes/core/TimeNode/TimeNode';
import { UVNode } from './nodes/core/UVNode/UVNode';
import { WebGLContextNode } from './nodes/core/WebGLContextNode/WebGLContextNode';
import { ModuloNode } from './nodes/math/ModuloNode/ModuloNode';
import { SineNode } from './nodes/math/SineNode/SineNode';
import { Vector2Node } from './nodes/math/Vector2Node/Vector2Node';
import { SimplexNoiseNode } from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode';
import { CameraNode } from './nodes/textures/CameraNode/CameraNode';
import { IWebGLNodeCollection, WebGLNodeType } from './types';

export const nodes: IWebGLNodeCollection = {
    [WebGLNodeType.WEBGL_CONTEXT]: WebGLContextNode,
    [WebGLNodeType.SIMPLEX_NOISE]: SimplexNoiseNode,
    [WebGLNodeType.CAMERA]: CameraNode,
    [WebGLNodeType.SINE]: SineNode,
    [WebGLNodeType.MODULO]: ModuloNode,
    [WebGLNodeType.TIME]: TimeNode,
    [WebGLNodeType.UV]: UVNode,
    [WebGLNodeType.VECTOR_2]: Vector2Node
};

/** Types */
export * from './types';

/** Models */
export * from './models/WebGLContext/WebGLContext';
export * from './models/WebGLContext/WebGLContext.types';

/** Core Nodes */
export * from './nodes/core/TimeNode/TimeNode';
export * from './nodes/core/TimeNode/TimeNode.types';
export * from './nodes/core/UVNode/UVNode';
export * from './nodes/core/UVNode/UVNode.types';
export * from './nodes/core/WebGLContextNode/WebGLContextNode';
export * from './nodes/core/WebGLContextNode/WebGLContextNode.types';

/** Math Nodes */
export * from './nodes/math/ModuloNode/ModuloNode';
export * from './nodes/math/ModuloNode/ModuloNode.types';
export * from './nodes/math/SineNode/SineNode';
export * from './nodes/math/SineNode/SineNode.types';
export * from './nodes/math/Vector2Node/Vector2Node';
export * from './nodes/math/Vector2Node/Vector2Node.types';

/** Noise */
export * from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode';
export * from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode.types';
