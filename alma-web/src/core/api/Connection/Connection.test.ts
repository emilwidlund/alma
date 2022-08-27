import { Context } from '../Context/Context';
import { RendererType } from '../../../client/lib/Renderer/Renderer.types';
import { Node } from '../Node/Node';

class DummyNode extends Node {}

describe('Connection', () => {
    let context: Context;

    beforeEach(() => {
        context = new Context({ rendererType: RendererType.CANVAS });
    });

    it('should transport values', () => {
        const node = new DummyNode(context, {
            inputs: { a: { name: 'A', defaultValue: 5, type: ValueType.NUMBER } }
        });
        const i = node.inputs.a;

        const node2 = new DummyNode(context, {
            outputs: { b: { name: 'B', defaultValue: 10, type: ValueType.NUMBER } }
        });
        const o = node2.outputs.b;

        const c = o.connect(i);
        expect(c.alive).toBeTruthy();
        expect(i.value).toEqual(10);

        o.value = 100;
        expect(i.value).toEqual(100);
    });

    it('should not transport values after disposal', () => {
        const node = new DummyNode(context, {
            inputs: { a: { name: 'A', defaultValue: 5, type: ValueType.NUMBER } }
        });
        const i = node.inputs.a;

        const node2 = new DummyNode(context, {
            outputs: { b: { name: 'B', defaultValue: 10, type: ValueType.NUMBER } }
        });
        const o = node2.outputs.b;

        const c = o.connect(i);
        expect(i.value).toEqual(10);

        context.disconnect(c);

        o.value = 100;
        expect(i.value).not.toEqual(100);
        expect(c.alive).toBeFalsy();
    });

    it('should reset input to defaultValue after disposal', () => {
        const node = new DummyNode(context, {
            inputs: { a: { name: 'A', defaultValue: 5, type: ValueType.NUMBER } }
        });
        const i = node.inputs.a;

        const node2 = new DummyNode(context, {
            outputs: { b: { name: 'B', defaultValue: 0, type: ValueType.NUMBER } }
        });
        const o = node2.outputs.b;

        const c = o.connect(i);

        o.value = 10;
        expect(i.value).toEqual(10);

        context.disconnect(c);
        expect(i.value).toEqual(5);
    });

    it('should mark ports as connected', () => {
        const node = new DummyNode(context, {
            inputs: { a: { name: 'A', defaultValue: 0, type: ValueType.NUMBER } }
        });

        const node2 = new DummyNode(context, {
            outputs: {
                a: { name: 'A', defaultValue: 0, type: ValueType.NUMBER }
            }
        });

        const connection = node2.outputs.a.connect(node.inputs.a);

        expect(node.inputs.a.connected).toBeTruthy();
        expect(node2.outputs.a.connected).toBeTruthy();

        context.disconnect(connection);

        expect(node.inputs.a.connected).toBeFalsy();
        expect(node2.outputs.a.connected).toBeFalsy();
    });

    it('should not allow connections with different value types', () => {
        const node = new DummyNode(context, {
            inputs: { a: { name: 'A', defaultValue: 'Hello', type: ValueType.STRING } }
        });
        const i = node.inputs.a;

        const node2 = new DummyNode(context, {
            outputs: { b: { name: 'B', defaultValue: 0, type: ValueType.NUMBER } }
        });
        const o = node2.outputs.b;

        expect(() => o.connect(i)).toThrowError();

        o.value = 10;
        expect(i.value).not.toEqual(10);
    });

    it('should not allow connections between output/input which share the same node', () => {
        const node = new DummyNode(context, {
            inputs: { a: { name: 'A', defaultValue: 2, type: ValueType.NUMBER } },
            outputs: { b: { name: 'B', defaultValue: 5, type: ValueType.NUMBER } }
        });

        expect(() => node.outputs.b.connect(node.inputs.a)).toThrowError();

        node.outputs.b.value = 10;
        expect(node.inputs.a.value).not.toEqual(10);
    });

    it('should not allow connections where input already is connected', () => {
        const node = new DummyNode(context, {
            inputs: { a: { name: 'A', defaultValue: 0, type: ValueType.NUMBER } }
        });

        const node2 = new DummyNode(context, {
            outputs: {
                a: { name: 'A', defaultValue: 0, type: ValueType.NUMBER },
                b: { name: 'B', defaultValue: 0, type: ValueType.NUMBER }
            }
        });

        node2.outputs.a.connect(node.inputs.a);

        expect(() => node2.outputs.b.connect(node.inputs.a)).toThrowError();
    });

    it('should restore reactivity after serialization', () => {
        const node = new DummyNode(context, {
            inputs: { a: { name: 'A', defaultValue: 5, type: ValueType.NUMBER } }
        });
        const i = node.inputs.a;

        const node2 = new DummyNode(context, {
            outputs: { b: { name: 'B', defaultValue: 10, type: ValueType.NUMBER } }
        });
        const o = node2.outputs.b;
        const c = o.connect(i);

        const serialized = JSON.parse(JSON.stringify(context));
        const newContext = new Context(serialized);
        const restoredConnection = newContext.connections.get(c.id);

        expect(restoredConnection).toBeDefined();
        expect(restoredConnection?.input.value).toEqual(10);

        restoredConnection!.output.value = 100;
        expect(restoredConnection?.input.value).toEqual(100);

        newContext.disconnect(restoredConnection!);
        expect(restoredConnection?.input.value).toEqual(5);
    });
});
