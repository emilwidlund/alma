import {Root} from './Root';

describe('WebGL Context', () => {
    it('should initialize with correct values', () => {
        const root = new Root();

        expect(typeof root.id).toEqual('string');
        expect(root.name).toEqual('Root');
        expect(root.inputs.color).toBeDefined();
        expect(root.outputs).toEqual({});
    });
});
