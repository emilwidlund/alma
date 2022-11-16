import { TimeNode } from './nodes/core/TimeNode/TimeNode';
import { UVNode } from './nodes/core/UVNode/UVNode';
import { WebGLContextNode } from './nodes/core/WebGLContextNode/WebGLContextNode';
import { GLSLNode } from './nodes/glsl/GLSLNode/GLSLNode';
import { AdditionNode } from './nodes/math/AdditionNode/AdditionNode';
import { CosineNode } from './nodes/math/CosineNode/CosineNode';
import { ModuloNode } from './nodes/math/ModuloNode/ModuloNode';
import { SineNode } from './nodes/math/SineNode/SineNode';
import { Vector2Node } from './nodes/math/Vector2Node/Vector2Node';
import { Vector3Node } from './nodes/math/Vector3Node/Vector3Node';
import { Vector4Node } from './nodes/math/Vector4Node/Vector4Node';
import { SimplexNoiseNode } from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode';
import { CameraNode } from './nodes/textures/CameraNode/CameraNode';
import { MixNode } from './nodes/utils/MixNode/MixNode';
import { Swizzle2Node } from './nodes/utils/Swizzle2Node/Swizzle2Node';
import { Swizzle3Node } from './nodes/utils/Swizzle3Node/Swizzle3Node';
import { Swizzle4Node } from './nodes/utils/Swizzle4Node/Swizzle4Node';
import { IWebGLNodeCollection, WebGLNodeType } from './types';

export const nodes: IWebGLNodeCollection = {
    [WebGLNodeType.WEBGL_CONTEXT]: WebGLContextNode,
    [WebGLNodeType.SIMPLEX_NOISE]: SimplexNoiseNode,
    [WebGLNodeType.CAMERA]: CameraNode,
    [WebGLNodeType.SINE]: SineNode,
    [WebGLNodeType.COSINE]: CosineNode,
    [WebGLNodeType.ADDITION]: AdditionNode,
    [WebGLNodeType.GLSL]: GLSLNode,
    [WebGLNodeType.MODULO]: ModuloNode,
    [WebGLNodeType.TIME]: TimeNode,
    [WebGLNodeType.SWIZZLE_2]: Swizzle2Node,
    [WebGLNodeType.SWIZZLE_3]: Swizzle3Node,
    [WebGLNodeType.SWIZZLE_4]: Swizzle4Node,
    [WebGLNodeType.MIX]: MixNode,
    [WebGLNodeType.UV]: UVNode,
    [WebGLNodeType.VECTOR_2]: Vector2Node,
    [WebGLNodeType.VECTOR_3]: Vector3Node,
    [WebGLNodeType.VECTOR_4]: Vector4Node
};

/** Types */
export * from './types';

/** Models */
export * from './models/WebGLContext/WebGLContext';
export * from './models/WebGLContext/WebGLContext.types';
export * from './models/CameraManager/CameraManager';
export * from './models/CameraManager/CameraManager.types';
export * from './models/Texture/Texture';

/** Core Nodes */
export * from './nodes/core/TimeNode/TimeNode';
export * from './nodes/core/TimeNode/TimeNode.types';
export * from './nodes/core/UVNode/UVNode';
export * from './nodes/core/UVNode/UVNode.types';
export * from './nodes/core/WebGLContextNode/WebGLContextNode';
export * from './nodes/core/WebGLContextNode/WebGLContextNode.types';

/** Math Nodes */
export * from './nodes/math/AdditionNode/AdditionNode';
export * from './nodes/math/AdditionNode/AdditionNode.types';
export * from './nodes/math/ModuloNode/ModuloNode';
export * from './nodes/math/ModuloNode/ModuloNode.types';
export * from './nodes/math/SineNode/SineNode';
export * from './nodes/math/SineNode/SineNode.types';
export * from './nodes/math/CosineNode/CosineNode';
export * from './nodes/math/CosineNode/CosineNode.types';
export * from './nodes/math/Vector2Node/Vector2Node';
export * from './nodes/math/Vector2Node/Vector2Node.types';
export * from './nodes/math/Vector3Node/Vector3Node';
export * from './nodes/math/Vector3Node/Vector3Node.types';
export * from './nodes/math/Vector4Node/Vector4Node';
export * from './nodes/math/Vector4Node/Vector4Node.types';

/** Noise */
export * from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode';
export * from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode.types';

/** Textures */
export * from './nodes/textures/CameraNode/CameraNode';
export * from './nodes/textures/CameraNode/CameraNode.types';

/** GLSL */
export * from './nodes/glsl/GLSLNode/GLSLNode';
export * from './nodes/glsl/GLSLNode/GLSLNode.types';

/** Utils */
export * from './nodes/utils/Swizzle2Node/Swizzle2Node';
export * from './nodes/utils/Swizzle2Node/Swizzle2Node.types';
export * from './nodes/utils/Swizzle3Node/Swizzle3Node';
export * from './nodes/utils/Swizzle3Node/Swizzle3Node.types';
export * from './nodes/utils/Swizzle4Node/Swizzle4Node';
export * from './nodes/utils/Swizzle4Node/Swizzle4Node.types';
export * from './nodes/utils/MixNode/MixNode';
export * from './nodes/utils/MixNode/MixNode.types';
