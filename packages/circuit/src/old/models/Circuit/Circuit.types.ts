import { Sym } from '@thi.ng/shader-ast';
import { UniformDecl } from '@thi.ng/webgl';
import { IContextProps } from '@usealma/graph';

import { ClassConstructor, WebGLNode } from '../../types';
import { ICameraManagerProps } from '../CameraManager/CameraManager.types';
import { ITextureManagerProps } from '../TextureManager/TextureManager.types';

export interface IUniforms {
    mouse: UniformDecl;
    time: UniformDecl;
    resolution: UniformDecl;
    cameraTexture: UniformDecl;
    previousTexture?: UniformDecl;
}

export interface ICompiledUniforms {
    [key: string]: any;
    mouse: Sym<'vec2'>;
    time: Sym<'float'>;
    resolution: Sym<'vec2'>;
    cameraTexture: Sym<'sampler2D'>;
    previousTexture?: Sym<'sampler2D'>;
}

export interface INodesCollection {
    [key: string]: ClassConstructor<WebGLNode>;
}

export interface ICircuitProps extends IContextProps {
    textureManager: ITextureManagerProps;
    cameraManager: ICameraManagerProps;
    nodesCollection: INodesCollection;
}
