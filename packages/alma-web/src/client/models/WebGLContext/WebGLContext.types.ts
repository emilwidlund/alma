import { Sym } from '@thi.ng/shader-ast';

export interface IKnownUniforms {
    mouse: Sym<'vec2'>;
    time: Sym<'float'>;
    resolution: Sym<'vec2'>;
}

export type IUniforms = IKnownUniforms & {
    [key: string]: Sym<any>;
};
