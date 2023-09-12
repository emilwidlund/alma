import { PINode } from './nodes/accessor/PINode/PINode';
import { ResolutionNode } from './nodes/accessor/ResolutionNode/ResolutionNode';
import { TimeNode } from './nodes/accessor/TimeNode/TimeNode';
import { UVNode } from './nodes/accessor/UVNode/UVNode';
import { WebGLContextNode } from './nodes/accessor/WebGLContextNode/WebGLContextNode';
import { AbsoluteNode } from './nodes/common/AbsoluteNode/AbsoluteNode';
import { CeilNode } from './nodes/common/CeilNode/CeilNode';
import { ClampNode } from './nodes/common/ClampNode/ClampNode';
import { FloorNode } from './nodes/common/FloorNode/FloorNode';
import { FractionalNode } from './nodes/common/FractionalNode/FractionalNode';
import { MaximumNode } from './nodes/common/MaximumNode/MaximumNode';
import { MinimumNode } from './nodes/common/MinimumNode/MinimumNode';
import { MixNode } from './nodes/common/MixNode/MixNode';
import { ModuloNode } from './nodes/common/ModuloNode/ModuloNode';
import { SignNode } from './nodes/common/SignNode/SignNode';
import { SmoothstepNode } from './nodes/common/SmoothstepNode/SmoothstepNode';
import { StepNode } from './nodes/common/StepNode/StepNode';
import { ExponentiationNode } from './nodes/exponential/ExponentiationNode/ExponentiationNode';
import { InverseSquareRootNode } from './nodes/exponential/InverseSquareRootNode/InverseSquareRootNode';
import { LogarithmNode } from './nodes/exponential/LogarithmNode/LogarithmNode';
import { PowerNode } from './nodes/exponential/PowerNode/PowerNode';
import { SquareRootNode } from './nodes/exponential/SquareRootNode/SquareRootNode';
import { GLSLNode } from './nodes/glsl/GLSLNode/GLSLNode';
import { AdditionNode } from './nodes/math/AdditionNode/AdditionNode';
import { DivisionNode } from './nodes/math/DivisionNode/DivisionNode';
import { MultiplicationNode } from './nodes/math/MultiplicationNode/MultiplicationNode';
import { SubtractionNode } from './nodes/math/SubtractionNode/SubtractionNode';
import { SimplexNoiseNode } from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode';
import { CameraNode } from './nodes/textures/CameraNode/CameraNode';
import { TextureNode } from './nodes/textures/TextureNode/TextureNode';
import { ArccosineNode } from './nodes/trigonometry/ArccosineNode/ArccosineNode';
import { ArcsineNode } from './nodes/trigonometry/ArcsineNode/ArcsineNode';
import { ArctangentNode } from './nodes/trigonometry/ArctangentNode/ArctangentNode';
import { CosineNode } from './nodes/trigonometry/CosineNode/CosineNode';
import { DegreesNode } from './nodes/trigonometry/DegreesNode/DegreesNode';
import { RadiansNode } from './nodes/trigonometry/RadiansNode/RadiansNode';
import { SineNode } from './nodes/trigonometry/SineNode/SineNode';
import { TangentNode } from './nodes/trigonometry/TangentNode/TangentNode';
import { CrossProductNode } from './nodes/vectors/CrossProductNode/CrossProductNode';
import { DistanceNode } from './nodes/vectors/DistanceNode/DistanceNode';
import { DotProductNode } from './nodes/vectors/DotProductNode/DotProductNode';
import { LengthNode } from './nodes/vectors/LengthNode/LengthNode';
import { NormalizeNode } from './nodes/vectors/NormalizeNode/NormalizeNode';
import { SwizzleNode } from './nodes/vectors/SwizzleNode/SwizzleNode';
import { Vector2Node } from './nodes/vectors/Vector2Node/Vector2Node';
import { Vector3Node } from './nodes/vectors/Vector3Node/Vector3Node';
import { Vector4Node } from './nodes/vectors/Vector4Node/Vector4Node';
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
    [WebGLNodeType.CROSS_PRODUCT]: CrossProductNode,
    [WebGLNodeType.DOT_PRODUCT]: DotProductNode,
    [WebGLNodeType.TANGENT]: TangentNode,
    [WebGLNodeType.ARCTANGENT]: ArctangentNode,
    [WebGLNodeType.RADIANS]: RadiansNode,
    [WebGLNodeType.DEGREES]: DegreesNode,
    [WebGLNodeType.POWER]: PowerNode,
    [WebGLNodeType.SQUARE_ROOT]: SquareRootNode,
    [WebGLNodeType.INVERSE_SQUARE_ROOT]: InverseSquareRootNode,
    [WebGLNodeType.EXPONENTIATION]: ExponentiationNode,
    [WebGLNodeType.LOGARITHM]: LogarithmNode,
    [WebGLNodeType.GLSL]: GLSLNode,
    [WebGLNodeType.MODULO]: ModuloNode,
    [WebGLNodeType.TEXTURE]: TextureNode,
    [WebGLNodeType.TIME]: TimeNode,
    [WebGLNodeType.SWIZZLE]: SwizzleNode,
    [WebGLNodeType.MIX]: MixNode,
    [WebGLNodeType.CLAMP]: ClampNode,
    [WebGLNodeType.STEP]: StepNode,
    [WebGLNodeType.SMOOTHSTEP]: SmoothstepNode,
    [WebGLNodeType.UV]: UVNode,
    [WebGLNodeType.VECTOR_2]: Vector2Node,
    [WebGLNodeType.VECTOR_3]: Vector3Node,
    [WebGLNodeType.VECTOR_4]: Vector4Node,
    [WebGLNodeType.PI]: PINode,
    [WebGLNodeType.RESOLUTION]: ResolutionNode
};

/** Types */
export * from './types';

/** Models */
export * from './models/WebGLContext/WebGLContext';
export * from './models/WebGLContext/WebGLContext.types';
export * from './models/CameraManager/CameraManager';
export * from './models/CameraManager/CameraManager.types';
export * from './models/TextureManager/TextureManager';
export * from './models/TextureManager/TextureManager.types';
export * from './glsl/Processor/Processor';
export * from './glsl/Processor/Processor.types';

/** Common Nodes */
export * from './nodes/common/ModuloNode/ModuloNode';
export * from './nodes/common/ModuloNode/ModuloNode.types';
export * from './nodes/common/MixNode/MixNode';
export * from './nodes/common/MixNode/MixNode.types';
export * from './nodes/common/FractionalNode/FractionalNode';
export * from './nodes/common/FractionalNode/FractionalNode.types';
export * from './nodes/common/MinimumNode/MinimumNode';
export * from './nodes/common/MinimumNode/MinimumNode.types';
export * from './nodes/common/MaximumNode/MaximumNode';
export * from './nodes/common/MaximumNode/MaximumNode.types';
export * from './nodes/common/AbsoluteNode/AbsoluteNode';
export * from './nodes/common/AbsoluteNode/AbsoluteNode.types';
export * from './nodes/common/SignNode/SignNode';
export * from './nodes/common/SignNode/SignNode.types';
export * from './nodes/common/FloorNode/FloorNode';
export * from './nodes/common/FloorNode/FloorNode.types';
export * from './nodes/common/CeilNode/CeilNode';
export * from './nodes/common/CeilNode/CeilNode.types';
export * from './nodes/common/ClampNode/ClampNode';
export * from './nodes/common/ClampNode/ClampNode.types';
export * from './nodes/common/StepNode/StepNode';
export * from './nodes/common/StepNode/StepNode.types';
export * from './nodes/common/SmoothstepNode/SmoothstepNode';
export * from './nodes/common/SmoothstepNode/SmoothstepNode.types';

/** Accessor Nodes */
export * from './nodes/accessor/TimeNode/TimeNode';
export * from './nodes/accessor/TimeNode/TimeNode.types';
export * from './nodes/accessor/UVNode/UVNode';
export * from './nodes/accessor/UVNode/UVNode.types';
export * from './nodes/accessor/ResolutionNode/ResolutionNode';
export * from './nodes/accessor/ResolutionNode/ResolutionNode.types';
export * from './nodes/accessor/PINode/PINode';
export * from './nodes/accessor/PINode/PINode.types';
export * from './nodes/accessor/WebGLContextNode/WebGLContextNode';
export * from './nodes/accessor/WebGLContextNode/WebGLContextNode.types';

/** Math Nodes */
export * from './nodes/math/AdditionNode/AdditionNode';
export * from './nodes/math/AdditionNode/AdditionNode.types';
export * from './nodes/math/SubtractionNode/SubtractionNode';
export * from './nodes/math/SubtractionNode/SubtractionNode.types';
export * from './nodes/math/MultiplicationNode/MultiplicationNode';
export * from './nodes/math/MultiplicationNode/MultiplicationNode.types';
export * from './nodes/math/DivisionNode/DivisionNode';
export * from './nodes/math/DivisionNode/DivisionNode.types';

/** Trigonometry */
export * from './nodes/trigonometry/RadiansNode/RadiansNode';
export * from './nodes/trigonometry/RadiansNode/RadiansNode.types';
export * from './nodes/trigonometry/DegreesNode/DegreesNode';
export * from './nodes/trigonometry/DegreesNode/DegreesNode.types';
export * from './nodes/trigonometry/SineNode/SineNode';
export * from './nodes/trigonometry/SineNode/SineNode.types';
export * from './nodes/trigonometry/ArcsineNode/ArcsineNode';
export * from './nodes/trigonometry/ArcsineNode/ArcsineNode.types';
export * from './nodes/trigonometry/CosineNode/CosineNode';
export * from './nodes/trigonometry/CosineNode/CosineNode.types';
export * from './nodes/trigonometry/ArccosineNode/ArccosineNode';
export * from './nodes/trigonometry/ArccosineNode/ArccosineNode.types';
export * from './nodes/trigonometry/TangentNode/TangentNode';
export * from './nodes/trigonometry/TangentNode/TangentNode.types';
export * from './nodes/trigonometry/ArctangentNode/ArctangentNode';
export * from './nodes/trigonometry/ArctangentNode/ArctangentNode.types';

/** Exponential */
export * from './nodes/exponential/ExponentiationNode/ExponentiationNode';
export * from './nodes/exponential/ExponentiationNode/ExponentiationNode.types';
export * from './nodes/exponential/LogarithmNode/LogarithmNode';
export * from './nodes/exponential/LogarithmNode/LogarithmNode.types';
export * from './nodes/exponential/PowerNode/PowerNode';
export * from './nodes/exponential/PowerNode/PowerNode.types';
export * from './nodes/exponential/SquareRootNode/SquareRootNode';
export * from './nodes/exponential/SquareRootNode/SquareRootNode.types';
export * from './nodes/exponential/InverseSquareRootNode/InverseSquareRootNode';
export * from './nodes/exponential/InverseSquareRootNode/InverseSquareRootNode.types';

/** Vectors */
export * from './nodes/vectors/Vector2Node/Vector2Node';
export * from './nodes/vectors/Vector2Node/Vector2Node.types';
export * from './nodes/vectors/Vector3Node/Vector3Node';
export * from './nodes/vectors/Vector3Node/Vector3Node.types';
export * from './nodes/vectors/Vector4Node/Vector4Node';
export * from './nodes/vectors/Vector4Node/Vector4Node.types';
export * from './nodes/vectors/LengthNode/LengthNode';
export * from './nodes/vectors/LengthNode/LengthNode.types';
export * from './nodes/vectors/DistanceNode/DistanceNode';
export * from './nodes/vectors/DistanceNode/DistanceNode.types';
export * from './nodes/vectors/NormalizeNode/NormalizeNode';
export * from './nodes/vectors/NormalizeNode/NormalizeNode.types';
export * from './nodes/vectors/CrossProductNode/CrossProductNode';
export * from './nodes/vectors/CrossProductNode/CrossProductNode.types';
export * from './nodes/vectors/DotProductNode/DotProductNode';
export * from './nodes/vectors/DotProductNode/DotProductNode.types';
export * from './nodes/vectors/SwizzleNode/SwizzleNode';
export * from './nodes/vectors/SwizzleNode/SwizzleNode.types';

/** Textures */
export * from './nodes/textures/TextureNode/TextureNode';
export * from './nodes/textures/TextureNode/TextureNode.types';
export * from './nodes/textures/CameraNode/CameraNode';
export * from './nodes/textures/CameraNode/CameraNode.types';

/** Noise */
export * from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode';
export * from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode.types';

/** Misc Nodes */
export * from './nodes/glsl/GLSLNode/GLSLNode';
export * from './nodes/glsl/GLSLNode/GLSLNode.types';
