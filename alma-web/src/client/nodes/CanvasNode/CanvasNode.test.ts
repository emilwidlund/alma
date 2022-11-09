import { CanvasNode } from './CanvasNode';
import { Context } from '../../../core/api/Context/Context';
import { NumberOutput } from '../../Port/NumberPort/NumberPort';
import { RendererType } from '../../lib/Renderer/Renderer.types';
import { Circuit } from '../../lib/Circuit/Circuit';

describe('CanvasNode', () => {
    let circuit: Circuit;

    beforeEach(() => {
        circuit = new Circuit();
    });

    it('should initialize properly', () => {
        const node = new CanvasNode(context);

        expect(node.outputs.width instanceof NumberOutput).toBeTruthy();
        expect(node.outputs.width.value).toEqual(context.renderer.canvas.width);

        expect(node.outputs.height instanceof NumberOutput).toBeTruthy();
        expect(node.outputs.height.value).toEqual(context.renderer.canvas.height);
    });

    it('should restore and be functional from serialized data', () => {
        const node = new CanvasNode(context);

        context.renderer.width = 600;
        context.renderer.height = 600;

        const serialized = JSON.parse(JSON.stringify(context));

        const newContext = new Context(serialized);
        const restoredNode = newContext.nodes.get(node.id)!;

        expect(newContext.renderer.width).toEqual(600);
        expect(newContext.renderer.canvas.width).toEqual(600);
        expect(restoredNode.outputs.width.value).toEqual(600);

        expect(newContext.renderer.height).toEqual(600);
        expect(newContext.renderer.canvas.height).toEqual(600);
        expect(restoredNode.outputs.height.value).toEqual(600);
    });
});
