import { z } from 'zod';

import { PortValue } from './Port.types';

export const PortTypeSchema = z.enum([
    'void',
    'bool',
    'bool[]',
    'float',
    'float[]',
    'int',
    'int[]',
    'uint',
    'uint[]',
    'vec2',
    'vec2[]',
    'vec3',
    'vec3[]',
    'vec4',
    'vec4[]',
    'ivec2',
    'ivec2[]',
    'ivec3',
    'ivec3[]',
    'ivec4',
    'ivec4[]',
    'uvec2',
    'uvec2[]',
    'uvec3',
    'uvec3[]',
    'uvec4',
    'uvec4[]',
    'bvec2',
    'bvec2[]',
    'bvec3',
    'bvec3[]',
    'bvec4',
    'bvec4[]',
    'mat2',
    'mat2[]',
    'mat3',
    'mat3[]',
    'mat4',
    'mat4[]',
    'sampler2D',
    'sampler2D[]',
    'sampler3D',
    'sampler3D[]',
    'samplerCube',
    'samplerCube[]',
    'sampler2DShadow',
    'sampler2DShadow[]',
    'samplerCubeShadow',
    'samplerCubeShadow[]',
    'isampler2D',
    'isampler2D[]',
    'isampler3D',
    'isampler3D[]',
    'isamplerCube',
    'isamplerCube[]',
    'usampler2D',
    'usampler2D[]',
    'usampler3D',
    'usampler3D[]',
    'usamplerCube',
    'usamplerCube[]'
]);

export const PortTagSchema = z.enum([
    'arg',
    'array_init',
    'assign',
    'call',
    'call_i',
    'ctrl',
    'decl',
    'fn',
    'for',
    'idx',
    'idxm',
    'if',
    'lit',
    'op1',
    'op2',
    'ret',
    'scope',
    'swizzle',
    'sym',
    'ternary',
    'while'
]);

export const PortValueSchema: z.ZodType<PortValue> = z.lazy(() =>
    z.object({
        type: PortTypeSchema,
        tag: PortTagSchema,
        val: z.union([PortValueSchema, z.array(PortValueSchema), z.number()])
    })
);

export const PortSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: PortTypeSchema
});
