import { Int, IVec, Mat, Prim, Vec } from '@thi.ng/shader-ast';
import { IInputProps, IOutputProps } from '@usealma/graph';

import { WebGLNodeType } from '../types';

export type NodeSchema<T> = {
    id: string;
    type: WebGLNodeType;
    data: {
        position: {
            x: number;
            y: number;
        };
    };
} & T;

/** ACCESSOR NODES */

export type PINodeSchema = NodeSchema<{
    type: WebGLNodeType.PI;
}>;

export type ResolutionNodeSchema = NodeSchema<{
    type: WebGLNodeType.RESOLUTION;
}>;

export type TimeNodeSchema = NodeSchema<{
    type: WebGLNodeType.TIME;
}>;

export type UVNodeSchema = NodeSchema<{
    type: WebGLNodeType.UV;
}>;

export type RendererNodeSchema = NodeSchema<{
    type: WebGLNodeType.RENDERER;
    inputs: {
        color: IInputProps<'vec4'>;
    };
}>;

/** COMMON NODES */

export type AbsoluteNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.ABSOLUTE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type CeilNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.CEIL;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type ClampNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.CLAMP;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
        min: IInputProps<TType>;
        max: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type FloorNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.FLOOR;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type FractionalNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.FRACTIONAL;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type GLSLNodeSchema = NodeSchema<{
    type: WebGLNodeType.GLSL;
    props: {
        glsl: string;
    };
    inputs: Record<string, IInputProps<any>>;
    outputs: {
        output: IOutputProps<any>;
    };
}>;

export type MaximumNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.MAXIMUM;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type MinimumNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.MINIMUM;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type MixNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.MIX;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
        t: IInputProps<'float'>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type ModuloNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.MODULO;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type SignNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.SIGN;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type SmoothstepNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.SMOOTHSTEP;
    props: {
        type: TType;
    };
    inputs: {
        edgeA: IInputProps<TType>;
        edgeB: IInputProps<TType>;
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type StepNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.STEP;
    props: {
        type: TType;
    };
    inputs: {
        edge: IInputProps<TType>;
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

/** EFFECT NODES */

export type CreationNodeSchema = NodeSchema<{
    type: WebGLNodeType.CREATION_EFFECT;
}>;

/** EXPONENTIAL NODES */

export type ExponentiationNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.EXPONENTIATION;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type InverseSquareRootNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.INVERSE_SQUARE_ROOT;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type LogarithmNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.LOGARITHM;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type PowerNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.POWER;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type SquareRootNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.SQUARE_ROOT;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

/** MATH NODES */

export type AdditionNodeSchema<TType extends Prim | Int | IVec | Mat = Prim | Int | IVec | Mat> = NodeSchema<{
    type: WebGLNodeType.ADDITION;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type SubtractionNodeSchema<TType extends Prim | Int | IVec | Mat = Prim | Int | IVec | Mat> = NodeSchema<{
    type: WebGLNodeType.SUBTRACTION;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type MultiplicationNodeSchema<TType extends Prim | Int | IVec | Mat = Prim | Int | IVec | Mat> = NodeSchema<{
    type: WebGLNodeType.MULTIPLICATION;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type DivisionNodeSchema<TType extends Prim | Int | IVec | Mat = Prim | Int | IVec | Mat> = NodeSchema<{
    type: WebGLNodeType.DIVISION;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

/** NOISE NODES */

export type SimplexNoiseNodeSchema = NodeSchema<{
    type: WebGLNodeType.SIMPLEX_NOISE;
    props: {
        octaves: number;
    };
    inputs: {
        shift: IInputProps<'vec2'>;
        decay: IInputProps<'float'>;
        uv: IInputProps<'vec2'>;
    };
    outputs: {
        output: IOutputProps<'vec4'>;
    };
}>;

/** TEXTURE NODES */

export type CameraNodeSchema = NodeSchema<{
    type: WebGLNodeType.CAMERA;
    outputs: {
        output: IOutputProps<'vec4'>;
    };
}>;

export type TextureNodeSchema = NodeSchema<{
    type: WebGLNodeType.TEXTURE;
    props: {
        url: string;
    };
    outputs: {
        output: IOutputProps<'vec4'>;
    };
}>;

/** TRIGONOMETRY NODES */

export type ArccosineNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.ARCCOSINE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type ArcsineNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.ARCSINE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type ArctangentNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.ARCTANGENT;
    props: {
        type: TType;
    };
    inputs: {
        y: IInputProps<TType>;
        x: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type CosineNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.COSINE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type DegreesNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.DEGREES;
    props: {
        type: TType;
    };
    inputs: {
        radians: IInputProps<TType>;
    };
    outputs: {
        degrees: IOutputProps<TType>;
    };
}>;

export type RadiansNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.RADIANS;
    props: {
        type: TType;
    };
    inputs: {
        degrees: IInputProps<TType>;
    };
    outputs: {
        radians: IOutputProps<TType>;
    };
}>;

export type SineNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.SINE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type TangentNodeSchema<TType extends Prim = Prim> = NodeSchema<{
    type: WebGLNodeType.TANGENT;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

/** VECTOR NODES */

export type CrossProductNodeSchema = NodeSchema<{
    type: WebGLNodeType.CROSS_PRODUCT;
    inputs: {
        a: IInputProps<'vec3'>;
        b: IInputProps<'vec3'>;
    };
    outputs: {
        output: IOutputProps<'vec3'>;
    };
}>;

export type DistanceNodeSchema<TType extends Vec = Vec> = NodeSchema<{
    type: WebGLNodeType.DISTANCE;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<'float'>;
    };
}>;

export type DotProductNodeSchema<TType extends Vec = Vec> = NodeSchema<{
    type: WebGLNodeType.DOT_PRODUCT;
    props: {
        type: TType;
    };
    inputs: {
        a: IInputProps<TType>;
        b: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<'float'>;
    };
}>;

export type LengthNodeSchema<TType extends Vec = Vec> = NodeSchema<{
    type: WebGLNodeType.LENGTH;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<'float'>;
    };
}>;

export type NormalizeNodeSchema<TType extends Vec = Vec> = NodeSchema<{
    type: WebGLNodeType.NORMALIZE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
}>;

export type SwizzleNodeSchema<TType extends Vec = Vec> = NodeSchema<{
    type: WebGLNodeType.SWIZZLE;
    props: {
        type: TType;
    };
    inputs: {
        vector: IInputProps<TType>;
    };
    outputs: {
        x: IOutputProps<'float'>;
        y: IOutputProps<'float'>;
        z?: IOutputProps<'float'>;
        w?: IOutputProps<'float'>;
    };
}>;

export type Vector2NodeSchema = NodeSchema<{
    type: WebGLNodeType.VECTOR_2;
    inputs: {
        x: IInputProps<'float'>;
        y: IInputProps<'float'>;
    };
    outputs: {
        vector: IOutputProps<'vec2'>;
    };
}>;

export type Vector3NodeSchema = NodeSchema<{
    type: WebGLNodeType.VECTOR_3;
    inputs: {
        x: IInputProps<'float'>;
        y: IInputProps<'float'>;
        z: IInputProps<'float'>;
    };
    outputs: {
        vector: IOutputProps<'vec3'>;
    };
}>;

export type Vector4NodeSchema = NodeSchema<{
    type: WebGLNodeType.VECTOR_4;
    inputs: {
        x: IInputProps<'float'>;
        y: IInputProps<'float'>;
        z: IInputProps<'float'>;
        w: IInputProps<'float'>;
    };
    outputs: {
        vector: IOutputProps<'vec4'>;
    };
}>;

export type WebGLNodeSchema =
    | PINodeSchema
    | ResolutionNodeSchema
    | TimeNodeSchema
    | UVNodeSchema
    | RendererNodeSchema
    | AbsoluteNodeSchema
    | CeilNodeSchema
    | ClampNodeSchema
    | FloorNodeSchema
    | FractionalNodeSchema
    | GLSLNodeSchema
    | MaximumNodeSchema
    | MinimumNodeSchema
    | MixNodeSchema
    | ModuloNodeSchema
    | SignNodeSchema
    | SmoothstepNodeSchema
    | StepNodeSchema
    | CreationNodeSchema
    | ExponentiationNodeSchema
    | InverseSquareRootNodeSchema
    | LogarithmNodeSchema
    | PowerNodeSchema
    | SquareRootNodeSchema
    | AdditionNodeSchema
    | SubtractionNodeSchema
    | MultiplicationNodeSchema
    | DivisionNodeSchema
    | SimplexNoiseNodeSchema
    | CameraNodeSchema
    | TextureNodeSchema
    | ArccosineNodeSchema
    | ArcsineNodeSchema
    | ArctangentNodeSchema
    | CosineNodeSchema
    | DegreesNodeSchema
    | RadiansNodeSchema
    | SineNodeSchema
    | TangentNodeSchema
    | CrossProductNodeSchema
    | DistanceNodeSchema
    | DotProductNodeSchema
    | LengthNodeSchema
    | NormalizeNodeSchema
    | SwizzleNodeSchema
    | Vector2NodeSchema
    | Vector3NodeSchema
    | Vector4NodeSchema;
