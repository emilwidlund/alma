import { Renderer } from './Renderer';
import { RendererType } from './Renderer.types';

describe('Renderer', () => {
    it('should return the correct context depending on RendererType', () => {
        const rendererWithCanvas = new Renderer(RendererType.CANVAS);
        expect(rendererWithCanvas.context instanceof CanvasRenderingContext2D).toBeTruthy();

        const rendererWithWebGL = new Renderer(RendererType.WEBGL);
        expect(rendererWithWebGL.context instanceof WebGLRenderingContext).toBeTruthy();
    });

    it('should resize renderer', () => {
        const rendererWithCanvas = new Renderer(RendererType.CANVAS);

        rendererWithCanvas.resize(1000, 500);

        expect(rendererWithCanvas.canvas.width).toEqual(1000);
        expect(rendererWithCanvas.canvas.height).toEqual(500);
    });
});
