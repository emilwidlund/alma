import { CompositionNode } from './nodes/accessor/CompositionNode/CompositionNode';
import { PINode } from './nodes/accessor/PINode/PINode';
import { RendererNode } from './nodes/accessor/RendererNode/RendererNode';
import { ResolutionNode } from './nodes/accessor/ResolutionNode/ResolutionNode';
import { TimeNode } from './nodes/accessor/TimeNode/TimeNode';
import { UVNode } from './nodes/accessor/UVNode/UVNode';
import { AbsoluteNode } from './nodes/common/AbsoluteNode/AbsoluteNode';
import { CeilNode } from './nodes/common/CeilNode/CeilNode';
import { ClampNode } from './nodes/common/ClampNode/ClampNode';
import { FloorNode } from './nodes/common/FloorNode/FloorNode';
import { FractionalNode } from './nodes/common/FractionalNode/FractionalNode';
import { GLSLNode } from './nodes/common/GLSLNode/GLSLNode';
import { MaximumNode } from './nodes/common/MaximumNode/MaximumNode';
import { MinimumNode } from './nodes/common/MinimumNode/MinimumNode';
import { MixNode } from './nodes/common/MixNode/MixNode';
import { ModuloNode } from './nodes/common/ModuloNode/ModuloNode';
import { SignNode } from './nodes/common/SignNode/SignNode';
import { SmoothstepNode } from './nodes/common/SmoothstepNode/SmoothstepNode';
import { StepNode } from './nodes/common/StepNode/StepNode';
import { CreationEffectNode } from './nodes/effects/CreationEffectNode/CreationEffectNode';
import { ExponentiationNode } from './nodes/exponential/ExponentiationNode/ExponentiationNode';
import { InverseSquareRootNode } from './nodes/exponential/InverseSquareRootNode/InverseSquareRootNode';
import { LogarithmNode } from './nodes/exponential/LogarithmNode/LogarithmNode';
import { PowerNode } from './nodes/exponential/PowerNode/PowerNode';
import { SquareRootNode } from './nodes/exponential/SquareRootNode/SquareRootNode';
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

export enum WebGLNodeType {
    RENDERER = 'RENDERER',
    SIMPLEX_NOISE = 'SIMPLEX_NOISE',
    CAMERA = 'CAMERA',
    SINE = 'SINE',
    ARCSINE = 'ARCSINE',
    COSINE = 'COSINE',
    ARCCOSINE = 'ARCCOSINE',
    ADDITION = 'ADDITION',
    SUBTRACTION = 'SUBTRACTION',
    MULTIPLICATION = 'MULTIPLICATION',
    DIVISION = 'DIVISION',
    FRACTIONAL = 'FRACTIONAL',
    MINIMUM = 'MINIMUM',
    MAXIMUM = 'MAXIMUM',
    ABSOLUTE = 'ABSOLUTE',
    SIGN = 'SIGN',
    FLOOR = 'FLOOR',
    CEIL = 'CEIL',
    LENGTH = 'LENGTH',
    DISTANCE = 'DISTANCE',
    NORMALIZE = 'NORMALIZE',
    CROSS_PRODUCT = 'CROSS_PRODUCT',
    DOT_PRODUCT = 'DOT_PRODUCT',
    POWER = 'POWER',
    SQUARE_ROOT = 'SQUARE_ROOT',
    INVERSE_SQUARE_ROOT = 'INVERSE_SQUARE_ROOT',
    TANGENT = 'TANGENT',
    ARCTANGENT = 'ARCTANGENT',
    RADIANS = 'RADIANS',
    DEGREES = 'DEGREES',
    EXPONENTIATION = 'EXPONENTIATION',
    LOGARITHM = 'LOGARITHM',
    GLSL = 'GLSL',
    MIX = 'MIX',
    STEP = 'STEP',
    SMOOTHSTEP = 'SMOOTHSTEP',
    MODULO = 'MODULO',
    TEXTURE = 'TEXTURE',
    TIME = 'TIME',
    SWIZZLE = 'SWIZZLE',
    CLAMP = 'CLAMP',
    UV = 'UV',
    VECTOR_2 = 'VECTOR_2',
    VECTOR_3 = 'VECTOR_3',
    VECTOR_4 = 'VECTOR_4',
    PI = 'PI',
    RESOLUTION = 'RESOLUTION',
    COMPOSITION = 'COMPOSITION',

    // Effects
    CREATION_EFFECT = 'CREATION_EFFECT'
}

export interface ClassConstructor<T> {
    new (...args: any[]): T;
}

export interface IWebGLNodeCollection {
    [key: string]: ClassConstructor<WebGLNode>;
    [WebGLNodeType.RENDERER]: ClassConstructor<RendererNode>;
    [WebGLNodeType.SIMPLEX_NOISE]: ClassConstructor<SimplexNoiseNode>;
    [WebGLNodeType.CAMERA]: ClassConstructor<CameraNode>;
    [WebGLNodeType.SINE]: ClassConstructor<SineNode>;
    [WebGLNodeType.ARCSINE]: ClassConstructor<ArcsineNode>;
    [WebGLNodeType.ARCCOSINE]: ClassConstructor<ArccosineNode>;
    [WebGLNodeType.COSINE]: ClassConstructor<CosineNode>;
    [WebGLNodeType.ADDITION]: ClassConstructor<AdditionNode>;
    [WebGLNodeType.SUBTRACTION]: ClassConstructor<SubtractionNode>;
    [WebGLNodeType.MULTIPLICATION]: ClassConstructor<MultiplicationNode>;
    [WebGLNodeType.DIVISION]: ClassConstructor<DivisionNode>;
    [WebGLNodeType.FRACTIONAL]: ClassConstructor<FractionalNode>;
    [WebGLNodeType.MINIMUM]: ClassConstructor<MinimumNode>;
    [WebGLNodeType.MAXIMUM]: ClassConstructor<MaximumNode>;
    [WebGLNodeType.ABSOLUTE]: ClassConstructor<AbsoluteNode>;
    [WebGLNodeType.SIGN]: ClassConstructor<SignNode>;
    [WebGLNodeType.FLOOR]: ClassConstructor<FloorNode>;
    [WebGLNodeType.CEIL]: ClassConstructor<CeilNode>;
    [WebGLNodeType.LENGTH]: ClassConstructor<LengthNode>;
    [WebGLNodeType.DISTANCE]: ClassConstructor<DistanceNode>;
    [WebGLNodeType.CROSS_PRODUCT]: ClassConstructor<CrossProductNode>;
    [WebGLNodeType.DOT_PRODUCT]: ClassConstructor<DotProductNode>;
    [WebGLNodeType.POWER]: ClassConstructor<PowerNode>;
    [WebGLNodeType.SQUARE_ROOT]: ClassConstructor<SquareRootNode>;
    [WebGLNodeType.INVERSE_SQUARE_ROOT]: ClassConstructor<InverseSquareRootNode>;
    [WebGLNodeType.NORMALIZE]: ClassConstructor<NormalizeNode>;
    [WebGLNodeType.TANGENT]: ClassConstructor<TangentNode>;
    [WebGLNodeType.ARCTANGENT]: ClassConstructor<ArctangentNode>;
    [WebGLNodeType.RADIANS]: ClassConstructor<RadiansNode>;
    [WebGLNodeType.DEGREES]: ClassConstructor<DegreesNode>;
    [WebGLNodeType.EXPONENTIATION]: ClassConstructor<ExponentiationNode>;
    [WebGLNodeType.LOGARITHM]: ClassConstructor<LogarithmNode>;
    [WebGLNodeType.GLSL]: ClassConstructor<GLSLNode>;
    [WebGLNodeType.MODULO]: ClassConstructor<ModuloNode>;
    [WebGLNodeType.TEXTURE]: ClassConstructor<TextureNode>;
    [WebGLNodeType.TIME]: ClassConstructor<TimeNode>;
    [WebGLNodeType.SWIZZLE]: ClassConstructor<SwizzleNode>;
    [WebGLNodeType.CLAMP]: ClassConstructor<ClampNode>;
    [WebGLNodeType.MIX]: ClassConstructor<MixNode>;
    [WebGLNodeType.STEP]: ClassConstructor<StepNode>;
    [WebGLNodeType.SMOOTHSTEP]: ClassConstructor<SmoothstepNode>;
    [WebGLNodeType.UV]: ClassConstructor<UVNode>;
    [WebGLNodeType.VECTOR_2]: ClassConstructor<Vector2Node>;
    [WebGLNodeType.VECTOR_3]: ClassConstructor<Vector3Node>;
    [WebGLNodeType.VECTOR_4]: ClassConstructor<Vector4Node>;
    [WebGLNodeType.PI]: ClassConstructor<PINode>;
    [WebGLNodeType.RESOLUTION]: ClassConstructor<ResolutionNode>;
    [WebGLNodeType.COMPOSITION]: ClassConstructor<CompositionNode>;

    // Effects
    [WebGLNodeType.CREATION_EFFECT]: ClassConstructor<CreationEffectNode>;
}

export type WebGLEffectNode = CreationEffectNode;

export type WebGLNode =
    | RendererNode
    | SimplexNoiseNode
    | CameraNode
    | SineNode
    | ArcsineNode
    | CosineNode
    | ArccosineNode
    | AdditionNode
    | SubtractionNode
    | MultiplicationNode
    | DivisionNode
    | FractionalNode
    | MinimumNode
    | MaximumNode
    | AbsoluteNode
    | SignNode
    | FloorNode
    | CeilNode
    | LengthNode
    | DistanceNode
    | CrossProductNode
    | DotProductNode
    | NormalizeNode
    | TangentNode
    | ArctangentNode
    | RadiansNode
    | DegreesNode
    | PowerNode
    | SquareRootNode
    | InverseSquareRootNode
    | ExponentiationNode
    | LogarithmNode
    | GLSLNode
    | ModuloNode
    | SwizzleNode
    | ClampNode
    | MixNode
    | StepNode
    | SmoothstepNode
    | TextureNode
    | TimeNode
    | UVNode
    | Vector2Node
    | Vector3Node
    | Vector4Node
    | PINode
    | ResolutionNode
    | CompositionNode
    | WebGLEffectNode;
