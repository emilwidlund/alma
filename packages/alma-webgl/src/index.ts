import { TimeNode } from './nodes/core/TimeNode/TimeNode';
import { UVNode } from './nodes/core/UVNode/UVNode';
import { WebGLContextNode } from './nodes/core/WebGLContextNode/WebGLContextNode';
import { CreationEffectNode } from './nodes/effects/CreationEffectNode/CreationEffectNode';
import { GLSLNode } from './nodes/glsl/GLSLNode/GLSLNode';
import { AdditionNode } from './nodes/math/AdditionNode/AdditionNode';
import { CosineNode } from './nodes/math/CosineNode/CosineNode';
import { DivisionNode } from './nodes/math/DivisionNode/DivisionNode';
import { ModuloNode } from './nodes/math/ModuloNode/ModuloNode';
import { MultiplicationNode } from './nodes/math/MultiplicationNode/MultiplicationNode';
import { SineNode } from './nodes/math/SineNode/SineNode';
import { SubtractionNode } from './nodes/math/SubtractionNode/SubtractionNode';
import { Vector2Node } from './nodes/math/Vector2Node/Vector2Node';
import { Vector3Node } from './nodes/math/Vector3Node/Vector3Node';
import { Vector4Node } from './nodes/math/Vector4Node/Vector4Node';
import { SimplexNoiseNode } from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode';
import { CameraNode } from './nodes/textures/CameraNode/CameraNode';
import { TextureNode } from './nodes/textures/TextureNode/TextureNode';
import { MixNode } from './nodes/utils/MixNode/MixNode';
import { SwizzleNode } from './nodes/utils/SwizzleNode/SwizzleNode';
import { IWebGLNodeCollection, WebGLNodeType } from './types';

export const nodes: IWebGLNodeCollection = {
    [WebGLNodeType.WEBGL_CONTEXT]: WebGLContextNode,
    [WebGLNodeType.SIMPLEX_NOISE]: SimplexNoiseNode,
    [WebGLNodeType.CAMERA]: CameraNode,
    [WebGLNodeType.SINE]: SineNode,
    [WebGLNodeType.COSINE]: CosineNode,
    [WebGLNodeType.ADDITION]: AdditionNode,
    [WebGLNodeType.SUBTRACTION]: SubtractionNode,
    [WebGLNodeType.MULTIPLICATION]: MultiplicationNode,
    [WebGLNodeType.DIVISION]: DivisionNode,
    [WebGLNodeType.GLSL]: GLSLNode,
    [WebGLNodeType.MODULO]: ModuloNode,
    [WebGLNodeType.TEXTURE]: TextureNode,
    [WebGLNodeType.TIME]: TimeNode,
    [WebGLNodeType.SWIZZLE]: SwizzleNode,
    [WebGLNodeType.MIX]: MixNode,
    [WebGLNodeType.UV]: UVNode,
    [WebGLNodeType.VECTOR_2]: Vector2Node,
    [WebGLNodeType.VECTOR_3]: Vector3Node,
    [WebGLNodeType.VECTOR_4]: Vector4Node,

    // Effects
    [WebGLNodeType.CREATION_EFFECT]: CreationEffectNode
};

/** Types */
export * from './types';

/** Models */
export * from './models/WebGLContext/WebGLContext';
export * from './models/WebGLContext/WebGLContext.types';
export * from './models/CameraManager/CameraManager';
export * from './models/CameraManager/CameraManager.types';

/** Core Nodes */
export * from './nodes/core/TimeNode/TimeNode';
export * from './nodes/core/TimeNode/TimeNode.types';
export * from './nodes/core/UVNode/UVNode';
export * from './nodes/core/UVNode/UVNode.types';
export * from './nodes/core/WebGLContextNode/WebGLContextNode';
export * from './nodes/core/WebGLContextNode/WebGLContextNode.types';

/** Effect Nodes */
export * from './nodes/effects/CreationEffectNode/CreationEffectNode';

/** Math Nodes */
export * from './nodes/math/AdditionNode/AdditionNode';
export * from './nodes/math/AdditionNode/AdditionNode.types';
export * from './nodes/math/SubtractionNode/SubtractionNode';
export * from './nodes/math/SubtractionNode/SubtractionNode.types';
export * from './nodes/math/MultiplicationNode/MultiplicationNode';
export * from './nodes/math/MultiplicationNode/MultiplicationNode.types';
export * from './nodes/math/DivisionNode/DivisionNode';
export * from './nodes/math/DivisionNode/DivisionNode.types';
export * from './nodes/math/ModuloNode/ModuloNode';
export * from './nodes/math/ModuloNode/ModuloNode.types';
export * from './nodes/math/SineNode/SineNode';
export * from './nodes/math/SineNode/SineNode.types';
export * from './nodes/math/CosineNode/CosineNode';
export * from './nodes/math/CosineNode/CosineNode.types';

/** Primitives */
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
export * from './nodes/textures/TextureNode/TextureNode';
export * from './nodes/textures/TextureNode/TextureNode.types';
export * from './nodes/textures/CameraNode/CameraNode';
export * from './nodes/textures/CameraNode/CameraNode.types';

/** GLSL */
export * from './nodes/glsl/GLSLNode/GLSLNode';
export * from './nodes/glsl/GLSLNode/GLSLNode.types';

/** Utils */
export * from './nodes/utils/SwizzleNode/SwizzleNode';
export * from './nodes/utils/SwizzleNode/SwizzleNode.types';
export * from './nodes/utils/MixNode/MixNode';
export * from './nodes/utils/MixNode/MixNode.types';
