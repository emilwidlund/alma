import { TimeNode } from './nodes/core/TimeNode/TimeNode';
import { UVNode } from './nodes/core/UVNode/UVNode';
import { WebGLContextNode } from './nodes/core/WebGLContextNode/WebGLContextNode';
import { CreationEffectNode } from './nodes/effects/CreationEffectNode/CreationEffectNode';
import { GLSLNode } from './nodes/glsl/GLSLNode/GLSLNode';
import { AdditionNode } from './nodes/math/AdditionNode/AdditionNode';
import { CosineNode } from './nodes/math/CosineNode/CosineNode';
import { DivisionNode } from './nodes/math/DivisionNode/DivisionNode';
import { FractionalNode } from './nodes/math/FractionalNode/FractionalNode';
import { MaximumNode } from './nodes/math/MaximumNode/MaximumNode';
import { MinimumNode } from './nodes/math/MinimumNode/MinimumNode';
import { ModuloNode } from './nodes/math/ModuloNode/ModuloNode';
import { MultiplicationNode } from './nodes/math/MultiplicationNode/MultiplicationNode';
import { SineNode } from './nodes/math/SineNode/SineNode';
import { SubtractionNode } from './nodes/math/SubtractionNode/SubtractionNode';
import { SimplexNoiseNode } from './nodes/noise/SimplexNoiseNode/SimplexNoiseNode';
import { Vector2Node } from './nodes/primitives/Vector2Node/Vector2Node';
import { Vector3Node } from './nodes/primitives/Vector3Node/Vector3Node';
import { Vector4Node } from './nodes/primitives/Vector4Node/Vector4Node';
import { CameraNode } from './nodes/textures/CameraNode/CameraNode';
import { TextureNode } from './nodes/textures/TextureNode/TextureNode';
import { MixNode } from './nodes/utils/MixNode/MixNode';
import { SwizzleNode } from './nodes/utils/SwizzleNode/SwizzleNode';

export enum WebGLNodeType {
    WEBGL_CONTEXT = 'WEBGL_CONTEXT',
    SIMPLEX_NOISE = 'SIMPLEX_NOISE',
    CAMERA = 'CAMERA',
    SINE = 'SINE',
    COSINE = 'COSINE',
    ADDITION = 'ADDITION',
    SUBTRACTION = 'SUBTRACTION',
    MULTIPLICATION = 'MULTIPLICATION',
    DIVISION = 'DIVISION',
    FRACTIONAL = 'FRACTIONAL',
    MINIMUM = 'MINIMUM',
    MAXIMUM = 'MAXIMUM',
    GLSL = 'GLSL',
    MIX = 'MIX',
    MODULO = 'MODULO',
    TEXTURE = 'TEXTURE',
    TIME = 'TIME',
    SWIZZLE = 'SWIZZLE',
    UV = 'UV',
    VECTOR_2 = 'VECTOR_2',
    VECTOR_3 = 'VECTOR_3',
    VECTOR_4 = 'VECTOR_4',

    // Effects
    CREATION_EFFECT = 'CREATION_EFFECT'
}

export interface ClassConstructor<T> {
    new (...args: any[]): T;
}

export interface IWebGLNodeCollection {
    [key: string]: ClassConstructor<WebGLNode>;
    [WebGLNodeType.WEBGL_CONTEXT]: ClassConstructor<WebGLContextNode>;
    [WebGLNodeType.SIMPLEX_NOISE]: ClassConstructor<SimplexNoiseNode>;
    [WebGLNodeType.CAMERA]: ClassConstructor<CameraNode>;
    [WebGLNodeType.SINE]: ClassConstructor<SineNode>;
    [WebGLNodeType.COSINE]: ClassConstructor<CosineNode>;
    [WebGLNodeType.ADDITION]: ClassConstructor<AdditionNode>;
    [WebGLNodeType.SUBTRACTION]: ClassConstructor<SubtractionNode>;
    [WebGLNodeType.MULTIPLICATION]: ClassConstructor<MultiplicationNode>;
    [WebGLNodeType.DIVISION]: ClassConstructor<DivisionNode>;
    [WebGLNodeType.FRACTIONAL]: ClassConstructor<FractionalNode>;
    [WebGLNodeType.MINIMUM]: ClassConstructor<MinimumNode>;
    [WebGLNodeType.MAXIMUM]: ClassConstructor<MaximumNode>;
    [WebGLNodeType.GLSL]: ClassConstructor<GLSLNode>;
    [WebGLNodeType.MODULO]: ClassConstructor<ModuloNode>;
    [WebGLNodeType.TEXTURE]: ClassConstructor<TextureNode>;
    [WebGLNodeType.TIME]: ClassConstructor<TimeNode>;
    [WebGLNodeType.SWIZZLE]: ClassConstructor<SwizzleNode>;
    [WebGLNodeType.MIX]: ClassConstructor<MixNode>;
    [WebGLNodeType.UV]: ClassConstructor<UVNode>;
    [WebGLNodeType.VECTOR_2]: ClassConstructor<Vector2Node>;
    [WebGLNodeType.VECTOR_3]: ClassConstructor<Vector3Node>;
    [WebGLNodeType.VECTOR_4]: ClassConstructor<Vector4Node>;

    // Effects
    [WebGLNodeType.CREATION_EFFECT]: ClassConstructor<CreationEffectNode>;
}

export type WebGLEffectNode = CreationEffectNode;

export type WebGLNode =
    | WebGLContextNode
    | SimplexNoiseNode
    | CameraNode
    | SineNode
    | CosineNode
    | AdditionNode
    | SubtractionNode
    | MultiplicationNode
    | DivisionNode
    | FractionalNode
    | MinimumNode
    | MaximumNode
    | GLSLNode
    | ModuloNode
    | SwizzleNode
    | MixNode
    | TextureNode
    | TimeNode
    | UVNode
    | Vector2Node
    | Vector3Node
    | Vector4Node
    | WebGLEffectNode;
