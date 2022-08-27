import { isNumber } from 'lodash';
import { autorun } from 'mobx';
import { NodeBuilder } from './NodeBuilder';
import { INode } from './NodeBuilder.types';

enum ValueType {
    Number,
    String,
    Boolean
}

describe('NodeBuilder', () => {
    let nodeBuilder: NodeBuilder;
    let node: INode;

    beforeEach(() => {
        nodeBuilder = new NodeBuilder();
        node = nodeBuilder
            .name('My Node')
            .input('a', {
                name: 'A',
                type: ValueType.Number,
                defaultValue: 5,
                validator: isNumber,
                valueReviver: val => Number(val),
                valueSerializer: val => val
            })
            .input('b', {
                name: 'B',
                type: ValueType.Number,
                defaultValue: 5,
                validator: isNumber,
                valueReviver: val => Number(val),
                valueSerializer: val => val
            })
            .output('out', node => ({
                name: 'Out',
                type: ValueType.Number,
                get value() {
                    return node.inputs.a.value + node.inputs.b.value;
                }
            })).node;
    });

    it('should return a properly initialized node', () => {
        expect(node.inputs.a.id).toBeDefined();
        expect(node.inputs.a.name).toBe('A');
        expect(node.inputs.a.type).toBe(ValueType.Number);
        expect(node.inputs.a.defaultValue).toBe(5);
        expect(node.inputs.a.value).toBe(5);
        expect(node.inputs.a.validator(10)).toBe(true);
        expect(node.inputs.a.validator('10')).toBe(false);

        expect(node.inputs.b.id).toBeDefined();
        expect(node.inputs.b.name).toBe('B');
        expect(node.inputs.b.type).toBe(ValueType.Number);
        expect(node.inputs.b.defaultValue).toBe(5);
        expect(node.inputs.b.value).toBe(5);
        expect(node.inputs.b.validator(10)).toBe(true);
        expect(node.inputs.b.validator('10')).toBe(false);

        expect(node.outputs.out.id).toBeDefined();
        expect(node.outputs.out.name).toBe('Out');
        expect(node.outputs.out.type).toBe(ValueType.Number);
        expect(node.outputs.out.value).toBe((node.inputs.a.value as number) + (node.inputs.b.value as number));
    });

    it('should have reactive outputs', () => {
        const cb = jest.fn(() => node.outputs.out.value);
        autorun(cb);

        expect(cb).lastReturnedWith(10);

        node.inputs.a.value = 100;
        expect(cb).lastReturnedWith(105);
    });
});
