import { BaseNode } from '../Node/BaseNode/BaseNode';
import { Renderer } from '../../../client/lib/Renderer/Renderer';
import { RendererType } from '../../../client/lib/Renderer/Renderer.types';
import { ValueType } from '../types/values';
import { Context } from './Context';

describe('Context', () => {
    it('should initialize with empty collections', () => {
        const context = new Context({ rendererType: RendererType.CANVAS });

        expect(context.nodes.size).toBe(0);
        expect(context.connections.size).toBe(0);
    });

    it('should have an initialized renderer', () => {
        const context = new Context({ rendererType: RendererType.CANVAS });

        expect(context.renderer instanceof Renderer).toBeTruthy();
    });

    it('should be able to add nodes', () => {
        const context = new Context({ rendererType: RendererType.CANVAS });
        const node = new BaseNode(context);

        expect(context.nodes.size).toBe(1);
        expect(context.nodes.has(node.id)).toBeTruthy();
    });

    it('should remove added nodes properly', () => {
        const context = new Context({ rendererType: RendererType.CANVAS });
        const node = new BaseNode(context);

        expect(context.nodes.has(node.id)).toBeTruthy();
        context.remove(node);
        expect(context.nodes.has(node.id)).toBeFalsy();
    });

    it('should be able to add and remove connections', () => {
        const context = new Context({ rendererType: RendererType.CANVAS });
        const node = new BaseNode(context, { outputs: { a: { defaultValue: 0, type: ValueType.NUMBER } } });
        const node2 = new BaseNode(context, { inputs: { b: { defaultValue: 0, type: ValueType.NUMBER } } });

        const connection = node.outputs.a.connect(node2.inputs.b);

        expect(context.connections.has(connection.id)).toBeTruthy();
        context.disconnect(connection);
        expect(context.connections.has(connection.id)).toBeFalsy();
    });

    it('should serialize properly', () => {
        const context = new Context({ rendererType: RendererType.CANVAS });
        const node = new BaseNode(context, { outputs: { a: { defaultValue: 0, type: ValueType.NUMBER } } });
        const node2 = new BaseNode(context, { inputs: { b: { defaultValue: 0, type: ValueType.NUMBER } } });

        const connection = node.outputs.a.connect(node2.inputs.b);

        const serialized = JSON.parse(JSON.stringify(context));

        expect(serialized).toEqual({
            id: context.id,
            rendererType: context.renderer.type,
            nodes: [
                {
                    id: node.id,
                    name: 'Base',
                    inputs: {},
                    outputs: {
                        a: {
                            id: node.outputs.a.id,
                            defaultValue: 0,
                            value: 0,
                            name: 'Untitled',
                            type: ValueType.NUMBER,
                            min: 0,
                            max: 1,
                            step: 0.01
                        }
                    },
                    nodeConstructor: 'BaseNode',
                    data: {
                        position: {
                            x: 0,
                            y: 0
                        }
                    }
                },
                {
                    id: node2.id,
                    name: 'Base',
                    inputs: {
                        b: {
                            id: node2.inputs.b.id,
                            defaultValue: 0,
                            value: 0,
                            name: 'Untitled',
                            type: ValueType.NUMBER,
                            min: 0,
                            max: 1,
                            step: 0.01
                        }
                    },
                    outputs: {},
                    nodeConstructor: 'BaseNode',
                    data: {
                        position: {
                            x: 0,
                            y: 0
                        }
                    }
                }
            ],
            connections: [
                {
                    id: connection.id,
                    outputId: connection.output.id,
                    inputId: connection.input.id
                }
            ]
        });
    });
});
