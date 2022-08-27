import { Context } from '../../../core/api/Context/Context';
import { Node } from '../../../core/api/Node/Node';
import { RendererType } from '../../lib/Renderer/Renderer.types';
import { ValueType } from '../../lib/types';
import { BooleanInput, BooleanOutput } from './BooleanPort';

class DummyNode extends Node {}

describe('BooleanInput', () => {
    let context: Context;
    let node: DummyNode;

    beforeEach(() => {
        context = new Context({ DummyNode });
        node = new DummyNode(context);
    });

    it('should initialize properly', () => {
        const input = new BooleanInput(node, {
            type: ValueType.BOOLEAN,
            defaultValue: false
        });

        expect(input.type).toEqual(ValueType.BOOLEAN);
        expect(input.defaultValue).toEqual(false);
        expect(input.value).toEqual(false);
        expect(input.node).toBe(node);
    });

    it('should initialize properly with predefined optional props', () => {
        const input = new BooleanInput(node, {
            id: '123',
            name: 'test',
            defaultValue: false,
            value: true,
            type: ValueType.BOOLEAN
        });

        expect(input.id).toEqual('123');
        expect(input.name).toEqual('test');
        expect(input.value).toEqual(true);
    });

    it('should serialize and restore properly', () => {
        const input = new BooleanInput(node, {
            id: '123',
            name: 'test',
            defaultValue: false,
            value: true,
            type: ValueType.BOOLEAN
        });

        expect(JSON.parse(JSON.stringify(input))).toEqual({
            id: '123',
            name: 'test',
            defaultValue: false,
            value: true,
            type: ValueType.BOOLEAN
        });

        const newInput = new BooleanInput(node, JSON.parse(JSON.stringify(input)));

        expect(newInput).toEqual(input);
    });
});

describe('BooleanOutput', () => {
    let context: Context;
    let node: Node;

    beforeEach(() => {
        context = new Context({ DummyNode });
        node = new DummyNode(context);
    });

    it('should initialize properly', () => {
        const output = new BooleanOutput(node, {
            type: ValueType.BOOLEAN,
            defaultValue: false
        });

        expect(output.type).toEqual(ValueType.BOOLEAN);
        expect(output.defaultValue).toEqual(false);
        expect(output.value).toEqual(false);
        expect(output.node).toBe(node);
    });

    it('should initialize properly with predefined optional props', () => {
        const output = new BooleanOutput(node, {
            id: '123',
            name: 'test',
            defaultValue: false,
            value: true,
            type: ValueType.BOOLEAN
        });

        expect(output.id).toEqual('123');
        expect(output.name).toEqual('test');
        expect(output.value).toEqual(true);
    });

    it('should serialize and restore properly', () => {
        const output = new BooleanOutput(node, {
            id: '123',
            name: 'test',
            defaultValue: false,
            value: true,
            type: ValueType.BOOLEAN
        });

        expect(JSON.parse(JSON.stringify(output))).toEqual({
            id: '123',
            name: 'test',
            defaultValue: false,
            value: true,
            type: ValueType.BOOLEAN
        });

        const newOutput = new BooleanOutput(node, JSON.parse(JSON.stringify(output)));

        expect(newOutput).toEqual(output);
    });
});
