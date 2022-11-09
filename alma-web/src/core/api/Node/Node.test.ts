import { Node } from './Node';
import { INode } from '..';
import { Context } from '../Context/Context';
import { NumberInput, NumberOutput } from '../../Port/NumberPort/NumberPort';
import { RendererType } from '../../../client/lib/Renderer/Renderer.types';
import { ValueType } from '../types/values';

describe('Node', () => {
    let context: Context;

    beforeEach(() => {
        context = new Context({ rendererType: RendererType.CANVAS });
    });

    it('should return a node with empty port collections', () => {
        const node = new Node(context);

        expect(Object.keys(node.inputs).length).toEqual(0);
        expect(Object.keys(node.outputs).length).toEqual(0);
    });

    it('should be capable of adding input ports', () => {
        const node = new Node<{ test: NumberInput<INode> }>(context, {
            inputs: { test: { name: 'test', defaultValue: 0, type: ValueType.NUMBER } }
        });

        expect(Object.keys(node.inputs).length).toEqual(1);
        expect(node.inputs.test instanceof NumberInput).toBeTruthy();
    });

    it('should be capable of adding output ports', () => {
        const node = new Node<{}, { test: NumberOutput<INode> }>(context, {
            outputs: { test: { name: 'test', defaultValue: 0, type: ValueType.NUMBER } }
        });

        expect(Object.keys(node.outputs).length).toEqual(1);
        expect(node.outputs.test instanceof NumberOutput).toBeTruthy();
    });

    it('should set position', () => {
        const node = new Node<{ test: NumberInput<INode> }, { test: NumberOutput<INode> }>(context, {
            inputs: { test: { name: 'test', defaultValue: 'hello', type: ValueType.STRING } },
            outputs: { test: { name: 'test', defaultValue: 0, type: ValueType.NUMBER } }
        });

        node.setPosition(100, 200);

        expect(node.data.position).toEqual({ x: 100, y: 200 });
    });

    it('should serialize properly', () => {
        const node = new Node<{ test: NumberInput<INode> }, { test: NumberOutput<INode> }>(context, {
            inputs: { test: { name: 'test', defaultValue: 'hello', type: ValueType.STRING } },
            outputs: { test: { name: 'test', defaultValue: 0, type: ValueType.NUMBER } }
        });

        const serialized = JSON.parse(JSON.stringify(node));

        expect(serialized).toEqual({
            id: node.id,
            name: node.name,
            nodeConstructor: 'Node',
            inputs: {
                test: {
                    id: node.inputs.test.id,
                    name: 'test',
                    type: ValueType.STRING,
                    defaultValue: 'hello',
                    value: 'hello'
                }
            },
            outputs: {
                test: {
                    id: node.outputs.test.id,
                    name: 'test',
                    type: ValueType.NUMBER,
                    defaultValue: 0,
                    value: 0,
                    min: node.outputs.test.min,
                    max: node.outputs.test.max,
                    step: node.outputs.test.step
                }
            },
            data: {
                position: {
                    x: 0,
                    y: 0
                }
            }
        });
    });
});
