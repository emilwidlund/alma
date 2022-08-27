import * as Color from 'color';

import { Context } from '../../Context/Context';
import { BaseNode } from '../../Node/BaseNode/BaseNode';
import { RendererType } from '../../Renderer/Renderer.types';
import { ValueType } from '../../types/values';
import { ColorInput, ColorOutput } from './ColorPort';

describe('ColorInput', () => {
    let context: Context;
    let node: BaseNode;

    beforeEach(() => {
        context = new Context({ rendererType: RendererType.CANVAS });
        node = new BaseNode(context);
    });

    it('should initialize properly', () => {
        const input = new ColorInput(node, {
            type: ValueType.COLOR,
            defaultValue: Color('#fff')
        });

        expect(input.type).toEqual(ValueType.COLOR);
        expect(input.defaultValue).toEqual(Color('#fff'));
        expect(input.value).toEqual(Color('#fff'));
        expect(input.node).toBe(node);
    });

    it('should initialize properly with predefined optional props', () => {
        const input = new ColorInput(node, {
            id: '123',
            name: 'test',
            defaultValue: Color('#fff'),
            value: Color('#000'),
            type: ValueType.COLOR
        });

        expect(input.id).toEqual('123');
        expect(input.name).toEqual('test');
        expect(input.value).toEqual(Color('#000'));
    });

    it('should serialize and restore properly', () => {
        const input = new ColorInput(node, {
            id: '123',
            name: 'test',
            defaultValue: Color('#fff'),
            value: Color('#000'),
            type: ValueType.COLOR
        });

        expect(JSON.parse(JSON.stringify(input))).toEqual({
            id: '123',
            name: 'test',
            defaultValue: Color('#fff'),
            value: Color('#000'),
            type: ValueType.COLOR
        });

        const newInput = new ColorInput(node, JSON.parse(JSON.stringify(input)));

        expect(newInput).toEqual(input);
    });
});

describe('ColorOutput', () => {
    let context: Context;
    let node: BaseNode;

    beforeEach(() => {
        context = new Context({ rendererType: RendererType.CANVAS });
        node = new BaseNode(context);
    });

    it('should initialize properly', () => {
        const output = new ColorOutput(node, {
            type: ValueType.COLOR,
            defaultValue: Color('#fff')
        });

        expect(output.type).toEqual(ValueType.COLOR);
        expect(output.defaultValue).toEqual(Color('#fff'));
        expect(output.value).toEqual(Color('#fff'));
        expect(output.node).toBe(node);
    });

    it('should initialize properly with predefined optional props', () => {
        const output = new ColorOutput(node, {
            id: '123',
            name: 'test',
            defaultValue: Color('#fff'),
            value: Color('#000'),
            type: ValueType.COLOR
        });

        expect(output.id).toEqual('123');
        expect(output.name).toEqual('test');
        expect(output.value).toEqual(Color('#000'));
    });

    it('should serialize and restore properly', () => {
        const output = new ColorOutput(node, {
            id: '123',
            name: 'test',
            defaultValue: Color('#fff'),
            value: Color('#000'),
            type: ValueType.COLOR
        });

        expect(JSON.parse(JSON.stringify(output))).toEqual({
            id: '123',
            name: 'test',
            defaultValue: Color('#fff'),
            value: Color('#000'),
            type: ValueType.COLOR
        });

        const newOutput = new ColorOutput(node, JSON.parse(JSON.stringify(output)));

        expect(newOutput).toEqual(output);
    });
});
