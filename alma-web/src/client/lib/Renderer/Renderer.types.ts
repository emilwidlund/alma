export enum RendererType {
    WEBGL = 'WEBGL',
    CANVAS = 'CANVAS'
}

export type RendererCanvasContext<TType extends RendererType> = TType extends RendererType.WEBGL
    ? WebGLRenderingContext
    : CanvasRenderingContext2D;
