import { Sym } from '@thi.ng/shader-ast';
import { UniformDecl } from '@thi.ng/webgl';

export interface IUniforms {
    mouse: UniformDecl;
    time: UniformDecl;
    resolution: UniformDecl;
}

export interface ICompiledUniforms {
    mouse: Sym<'vec2'>;
    time: Sym<'float'>;
    resolution: Sym<'vec2'>;
}

export interface DrawingSize {
    width: number;
    height: number;
}
