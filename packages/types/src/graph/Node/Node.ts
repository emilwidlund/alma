import { z } from 'zod';

export const WebGLNodeTypeSchema = z.enum([
    'WEBGL_CONTEXT',
    'SIMPLEX_NOISE',
    'CAMERA',
    'SINE',
    'ARCSINE',
    'COSINE',
    'ARCCOSINE',
    'ADDITION',
    'SUBTRACTION',
    'MULTIPLICATION',
    'DIVISION',
    'FRACTIONAL',
    'MINIMUM',
    'MAXIMUM',
    'ABSOLUTE',
    'SIGN',
    'FLOOR',
    'CEIL',
    'LENGTH',
    'DISTANCE',
    'NORMALIZE',
    'CROSS_PRODUCT',
    'DOT_PRODUCT',
    'POWER',
    'SQUARE_ROOT',
    'INVERSE_SQUARE_ROOT',
    'TANGENT',
    'ARCTANGENT',
    'RADIANS',
    'DEGREES',
    'EXPONENTIATION',
    'LOGARITHM',
    'GLSL',
    'MIX',
    'STEP',
    'SMOOTHSTEP',
    'MODULO',
    'TEXTURE',
    'TIME',
    'SWIZZLE',
    'CLAMP',
    'UV',
    'VECTOR_2',
    'VECTOR_3',
    'VECTOR_4',
    'PI',
    'RESOLUTION'
]);

export const NodeSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: WebGLNodeTypeSchema,
    inputs: z.any(),
    outputs: z.any(),
    data: z.any()
});

/**

export const PINodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.PI
});

export const ResolutionNodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.RESOLUTION
});

export const TimeNodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.TIME
});

export const UVNodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.UV
});

export const RendererNodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.RENDERER,
    inputs: {
        color: IInputProps<'vec4'>;
    }
});


export const AbsoluteNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.ABSOLUTE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const CeilNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.CEIL;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const ClampNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.CLAMP;
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
});

export const FloorNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.FLOOR;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const FractionalNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.FRACTIONAL;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const GLSLNodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.GLSL;
    props: {
        glsl: string;
    };
    inputs: Record<string, IInputProps<any>>;
    outputs: {
        output: IOutputProps<any>;
    };
});

export const MaximumNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.MAXIMUM;
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
});

export const MinimumNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.MINIMUM;
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
});

export const MixNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.MIX;
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
});

export const ModuloNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.MODULO;
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
});

export const SignNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.SIGN;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const SmoothstepNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.SMOOTHSTEP;
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
});

export const StepNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.STEP;
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
});


export const ExponentiationNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.EXPONENTIATION;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const InverseSquareRootNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.INVERSE_SQUARE_ROOT;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const LogarithmNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.LOGARITHM;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const PowerNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.POWER;
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
});

export const SquareRootNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.SQUARE_ROOT;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});


export const AdditionNodeSchema<TType extends Prim | Int | IVec | Mat = Prim | Int | IVec | Mat> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.ADDITION;
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
});

export const SubtractionNodeSchema<TType extends Prim | Int | IVec | Mat = Prim | Int | IVec | Mat> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.SUBTRACTION;
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
});

export const MultiplicationNodeSchema<TType extends Prim | Int | IVec | Mat = Prim | Int | IVec | Mat> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.MULTIPLICATION;
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
});

export const DivisionNodeSchema<TType extends Prim | Int | IVec | Mat = Prim | Int | IVec | Mat> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.DIVISION;
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
});


export const SimplexNoiseNodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.SIMPLEX_NOISE;
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
});


export const CameraNodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.CAMERA;
    outputs: {
        output: IOutputProps<'vec4'>;
    };
});

export const TextureNodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.TEXTURE;
    props: {
        url: string;
    };
    outputs: {
        output: IOutputProps<'vec4'>;
    };
});


export const ArccosineNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.ARCCOSINE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const ArcsineNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.ARCSINE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const ArctangentNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.ARCTANGENT;
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
});

export const CosineNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.COSINE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const DegreesNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.DEGREES;
    props: {
        type: TType;
    };
    inputs: {
        radians: IInputProps<TType>;
    };
    outputs: {
        degrees: IOutputProps<TType>;
    };
});

export const RadiansNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.RADIANS;
    props: {
        type: TType;
    };
    inputs: {
        degrees: IInputProps<TType>;
    };
    outputs: {
        radians: IOutputProps<TType>;
    };
});

export const SineNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.SINE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const TangentNodeSchema<TType extends Prim = Prim> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.TANGENT;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});


export const CrossProductNodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.CROSS_PRODUCT;
    inputs: {
        a: IInputProps<'vec3'>;
        b: IInputProps<'vec3'>;
    };
    outputs: {
        output: IOutputProps<'vec3'>;
    };
});

export const DistanceNodeSchema<TType extends Vec = Vec> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.DISTANCE;
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
});

export const DotProductNodeSchema<TType extends Vec = Vec> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.DOT_PRODUCT;
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
});

export const LengthNodeSchema<TType extends Vec = Vec> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.LENGTH;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<'float'>;
    };
});

export const NormalizeNodeSchema<TType extends Vec = Vec> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.NORMALIZE;
    props: {
        type: TType;
    };
    inputs: {
        input: IInputProps<TType>;
    };
    outputs: {
        output: IOutputProps<TType>;
    };
});

export const SwizzleNodeSchema<TType extends Vec = Vec> = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.SWIZZLE;
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
});

export const Vector2NodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.VECTOR_2;
    inputs: {
        x: IInputProps<'float'>;
        y: IInputProps<'float'>;
    };
    outputs: {
        vector: IOutputProps<'vec2'>;
    };
});

export const Vector3NodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.VECTOR_3;
    inputs: {
        x: IInputProps<'float'>;
        y: IInputProps<'float'>;
        z: IInputProps<'float'>;
    };
    outputs: {
        vector: IOutputProps<'vec3'>;
    };
});

export const Vector4NodeSchema = NodeSchema.extend({
    type: WebGLNodeTypeSchema.Enum.VECTOR_4;
    inputs: {
        x: IInputProps<'float'>;
        y: IInputProps<'float'>;
        z: IInputProps<'float'>;
        w: IInputProps<'float'>;
    };
    outputs: {
        vector: IOutputProps<'vec4'>;
    };
});

export const WebGLNodeSchema =
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

    */
