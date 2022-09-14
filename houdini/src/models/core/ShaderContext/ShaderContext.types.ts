import {
    TaggedFn0,
    TaggedFn1,
    TaggedFn2,
    TaggedFn3,
    TaggedFn4,
    TaggedFn5,
    TaggedFn6,
    TaggedFn7,
    TaggedFn8,
    Type
} from '@thi.ng/shader-ast';

export type ShaderFunction<
    A extends Type = any,
    B extends Type = any,
    C extends Type = any,
    D extends Type = any,
    E extends Type = any,
    F extends Type = any,
    G extends Type = any,
    H extends Type = any,
    I extends Type = any
> =
    | TaggedFn0<A>
    | TaggedFn1<A, B>
    | TaggedFn2<A, B, C>
    | TaggedFn3<A, B, C, D>
    | TaggedFn4<A, B, C, D, E>
    | TaggedFn5<A, B, C, D, E, F>
    | TaggedFn6<A, B, C, D, E, F, G>
    | TaggedFn7<A, B, C, D, E, F, G, H>
    | TaggedFn8<A, B, C, D, E, F, G, H, I>;
