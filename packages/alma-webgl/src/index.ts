import { TimeNode } from './nodes/core/TimeNode/TimeNode';
import { UVNode } from './nodes/core/UVNode/UVNode';
import { WebGLContextNode } from './nodes/core/WebGLContextNode/WebGLContextNode';
import { CreationEffectNode } from './nodes/effects/CreationEffectNode/CreationEffectNode';
import { GLSLNode } from './nodes/glsl/GLSLNode/GLSLNode';
import { AbsoluteNode } from './nodes/math/AbsoluteNode/AbsoluteNode';
import { AdditionNode } from './nodes/math/AdditionNode/AdditionNode';
import { ArccosineNode } from './nodes/math/ArccosineNode/ArccosineNode';
import { ArcsineNode } from './nodes/math/ArcsineNode/ArcsineNode';
import { ArctangentNode } from './nodes/math/ArctangentNode/ArctangentNode';
import { CeilNode } from './nodes/math/CeilNode/CeilNode';
import { CosineNode } from './nodes/math/CosineNode/CosineNode';
import { DivisionNode } from './nodes/math/DivisionNode/DivisionNode';
import { FloorNode } from './nodes/math/FloorNode/FloorNode';
import { FractionalNode } from './nodes/math/FractionalNode/FractionalNode';
import { InverseSquareRootNode } from './nodes/math/InverseSquareRootNode/InverseSquareRootNode';
import { MaximumNode } from './nodes/math/MaximumNode/MaximumNode';
import { MinimumNode } from './nodes/math/MinimumNode/MinimumNode';
import { ModuloNode } from './nodes/math/ModuloNode/ModuloNode';
import { MultiplicationNode } from './nodes/math/MultiplicationNode/MultiplicationNode';
import { PowerNode } from './nodes/math/PowerNode/PowerNode';
import { SignNode } from './nodes/math/SignNode/SignNode';
import { SineNode } from './nodes/math/SineNode/SineNode';
import { SquareRootNode } from './nodes/math/SquareRootNode/SquareRootNode';
import { SubtractionNode } from './nodes/math/SubtractionNode/SubtractionNode';
import { TangentNode } from './nodes/math/TangentNode/TangentNode';
import { SimplexNoiseNode } from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode';
import { Vector2Node } from './nodes/primitives/Vector2Node/Vector2Node';
import { Vector3Node } from './nodes/primitives/Vector3Node/Vector3Node';
import { Vector4Node } from './nodes/primitives/Vector4Node/Vector4Node';
import { CameraNode } from './nodes/textures/CameraNode/CameraNode';
import { TextureNode } from './nodes/textures/TextureNode/TextureNode';
import { DistanceNode } from './nodes/utils/DistanceNode/DistanceNode';
import { LengthNode } from './nodes/utils/LengthNode/LengthNode';
import { MixNode } from './nodes/utils/MixNode/MixNode';
import { NormalizeNode } from './nodes/utils/NormalizeNode/NormalizeNode';
import { SwizzleNode } from './nodes/utils/SwizzleNode/SwizzleNode';
import { IWebGLNodeCollection, WebGLNodeType } from './types';

export const nodes: IWebGLNodeCollection = {
    [WebGLNodeType.WEBGL_CONTEXT]: WebGLContextNode,
    [WebGLNodeType.SIMPLEX_NOISE]: SimplexNoiseNode,
    [WebGLNodeType.CAMERA]: CameraNode,
    [WebGLNodeType.SINE]: SineNode,
    [WebGLNodeType.ARCSINE]: ArcsineNode,
    [WebGLNodeType.COSINE]: CosineNode,
    [WebGLNodeType.ARCCOSINE]: ArccosineNode,
    [WebGLNodeType.ADDITION]: AdditionNode,
    [WebGLNodeType.SUBTRACTION]: SubtractionNode,
    [WebGLNodeType.MULTIPLICATION]: MultiplicationNode,
    [WebGLNodeType.DIVISION]: DivisionNode,
    [WebGLNodeType.FRACTIONAL]: FractionalNode,
    [WebGLNodeType.MINIMUM]: MinimumNode,
    [WebGLNodeType.MAXIMUM]: MaximumNode,
    [WebGLNodeType.ABSOLUTE]: AbsoluteNode,
    [WebGLNodeType.SIGN]: SignNode,
    [WebGLNodeType.FLOOR]: FloorNode,
    [WebGLNodeType.CEIL]: CeilNode,
    [WebGLNodeType.LENGTH]: LengthNode,
    [WebGLNodeType.DISTANCE]: DistanceNode,
    [WebGLNodeType.NORMALIZE]: NormalizeNode,
    [WebGLNodeType.TANGENT]: TangentNode,
    [WebGLNodeType.ARCTANGENT]: ArctangentNode,
    [WebGLNodeType.POWER]: PowerNode,
    [WebGLNodeType.SQUARE_ROOT]: SquareRootNode,
    [WebGLNodeType.INVERSE_SQUARE_ROOT]: InverseSquareRootNode,
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
export * from './nodes/math/ArcsineNode/ArcsineNode';
export * from './nodes/math/ArcsineNode/ArcsineNode.types';
export * from './nodes/math/CosineNode/CosineNode';
export * from './nodes/math/CosineNode/CosineNode.types';
export * from './nodes/math/ArccosineNode/ArccosineNode';
export * from './nodes/math/ArccosineNode/ArccosineNode.types';
export * from './nodes/math/FractionalNode/FractionalNode';
export * from './nodes/math/FractionalNode/FractionalNode.types';
export * from './nodes/math/MinimumNode/MinimumNode';
export * from './nodes/math/MinimumNode/MinimumNode.types';
export * from './nodes/math/MaximumNode/MaximumNode';
export * from './nodes/math/MaximumNode/MaximumNode.types';
export * from './nodes/math/AbsoluteNode/AbsoluteNode';
export * from './nodes/math/AbsoluteNode/AbsoluteNode.types';
export * from './nodes/math/SignNode/SignNode';
export * from './nodes/math/SignNode/SignNode.types';
export * from './nodes/math/FloorNode/FloorNode';
export * from './nodes/math/FloorNode/FloorNode.types';
export * from './nodes/math/CeilNode/CeilNode';
export * from './nodes/math/CeilNode/CeilNode.types';
export * from './nodes/math/PowerNode/PowerNode';
export * from './nodes/math/PowerNode/PowerNode.types';
export * from './nodes/math/SquareRootNode/SquareRootNode';
export * from './nodes/math/SquareRootNode/SquareRootNode.types';
export * from './nodes/math/InverseSquareRootNode/InverseSquareRootNode';
export * from './nodes/math/InverseSquareRootNode/InverseSquareRootNode.types';
export * from './nodes/math/TangentNode/TangentNode';
export * from './nodes/math/TangentNode/TangentNode.types';
export * from './nodes/math/ArctangentNode/ArctangentNode';
export * from './nodes/math/ArctangentNode/ArctangentNode.types';

/** Primitives */
export * from './nodes/primitives/Vector2Node/Vector2Node';
export * from './nodes/primitives/Vector2Node/Vector2Node.types';
export * from './nodes/primitives/Vector3Node/Vector3Node';
export * from './nodes/primitives/Vector3Node/Vector3Node.types';
export * from './nodes/primitives/Vector4Node/Vector4Node';
export * from './nodes/primitives/Vector4Node/Vector4Node.types';

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
export * from './nodes/utils/LengthNode/LengthNode';
export * from './nodes/utils/LengthNode/LengthNode.types';
export * from './nodes/utils/DistanceNode/DistanceNode';
export * from './nodes/utils/DistanceNode/DistanceNode.types';
export * from './nodes/utils/NormalizeNode/NormalizeNode';
export * from './nodes/utils/NormalizeNode/NormalizeNode.types';
