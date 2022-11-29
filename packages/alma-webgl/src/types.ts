import { TimeNode } from './nodes/core/TimeNode/TimeNode';
import { UVNode } from './nodes/core/UVNode/UVNode';
import { WebGLContextNode } from './nodes/core/WebGLContextNode/WebGLContextNode';
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
    GLSL = 'GLSL',
    MIX = 'MIX',
    MODULO = 'MODULO',
    TIME = 'TIME',
    SWIZZLE = 'SWIZZLE',
    UV = 'UV',
    VECTOR_2 = 'VECTOR_2',
    VECTOR_3 = 'VECTOR_3',
    VECTOR_4 = 'VECTOR_4'
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
    [WebGLNodeType.GLSL]: ClassConstructor<GLSLNode>;
    [WebGLNodeType.MODULO]: ClassConstructor<ModuloNode>;
    [WebGLNodeType.TIME]: ClassConstructor<TimeNode>;
    [WebGLNodeType.SWIZZLE]: ClassConstructor<SwizzleNode>;
    [WebGLNodeType.MIX]: ClassConstructor<MixNode>;
    [WebGLNodeType.UV]: ClassConstructor<UVNode>;
    [WebGLNodeType.VECTOR_2]: ClassConstructor<Vector2Node>;
    [WebGLNodeType.VECTOR_3]: ClassConstructor<Vector3Node>;
    [WebGLNodeType.VECTOR_4]: ClassConstructor<Vector4Node>;
}

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
    | GLSLNode
    | ModuloNode
    | SwizzleNode
    | MixNode
    | TimeNode
    | UVNode
    | Vector2Node
    | Vector3Node
    | Vector4Node;
