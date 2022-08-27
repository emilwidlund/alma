import { Context } from '../../Context/Context';
import { NumberOutput } from '../../Port/NumberPort/NumberPort';
import { RendererType } from '../../Renderer/Renderer.types';
import { CircleNode } from './CircleNode';

describe('CircleNode', () => {
    let context: Context;

    beforeEach(() => {
        context = new Context({ rendererType: RendererType.CANVAS });
    });

    it('should initialize properly', () => {
        const node = new CircleNode(context);

        expect(node.inputs.radius instanceof NumberOutput).toBeTruthy();
        expect(node.inputs.radius.value).toEqual(context.renderer.canvas.width / 4);

        expect(node.inputs.x instanceof NumberOutput).toBeTruthy();
        expect(node.inputs.x.value).toEqual(context.renderer.canvas.width / 2);

        expect(node.inputs.y instanceof NumberOutput).toBeTruthy();
        expect(node.inputs.y.value).toEqual(context.renderer.canvas.height / 2);

        expect(node.inputs.strokeWidth instanceof NumberOutput).toBeTruthy();
        expect(node.inputs.strokeWidth.value).toEqual(1);
    });

    it('should restore and be functional from serialized data', () => {
        const node = new CircleNode(context);

        context.renderer.width = 600;
        context.renderer.height = 600;

        const serialized = JSON.parse(JSON.stringify(context));

        const newContext = new Context(serialized);
        const restoredNode = newContext.nodes.get(node.id)!;

        expect(restoredNode.inputs.radius.value).toEqual(150);
        expect(restoredNode.inputs.x.value).toEqual(300);
        expect(restoredNode.inputs.y.value).toEqual(300);
        expect(restoredNode.inputs.strokeWidth.value).toEqual(1);
    });
});
