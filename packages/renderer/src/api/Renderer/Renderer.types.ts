import { FBO, ModelSpec, Texture } from '@thi.ng/webgl';

export type RenderTarget = HTMLCanvasElement | OffscreenCanvas | Texture;

export type RenderEntity = {
    model: ModelSpec;
    fbo?: FBO;
};

export type RenderDisposer = () => void;

export type RenderSequence = RenderEntity[];
