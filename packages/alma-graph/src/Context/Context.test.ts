import { add, float, FloatTerm, Sym } from '@thi.ng/shader-ast';
import _ from 'lodash';

import { Input } from '../Input/Input';
import { IInputProps } from '../Input/Input.types';
import { Node } from '../Node/Node';
import { INodeInputs, INodeOutputs, INodeProps, INodeSerialized } from '../Node/Node.types';
import { Output } from '../Output/Output';
import { IOutputProps } from '../Output/Output.types';
import { Context } from './Context';
import { IContextProps, IContextSerialized } from './Context.types';

interface IExtededNodeProps extends INodeProps {
    inputs?: {
        input?: IInputProps<'float'>;
    };
    outputs?: {
        output?: IOutputProps<'float'>;
    };
}

class ExtendedNode extends Node {
    type = '';
    inputs: INodeInputs;
    outputs: INodeOutputs;

    constructor(context: Context, props: IExtededNodeProps = {}) {
        super(context, props);

        this.inputs = {
            input: new Input(
                this,
                _.defaults(props.inputs?.input, {
                    defaultValue: float(0)
                })
            )
        };

        this.outputs = {
            output: new Output(
                this,
                _.defaults(props.outputs?.output, {
                    value: () => {
                        return add(
                            float(10),
                            this.resolveValue<'float', FloatTerm>(this.inputs.input.value as FloatTerm)
                        );
                    }
                })
            )
        };
    }
}

class ExtendedContext extends Context {
    constructor(props: IContextProps = {}) {
        super(props);

        this.root = this.initialize();
    }

    resolveNode<TNode extends Node>(props: INodeSerialized): TNode {
        return new ExtendedNode(this, props as unknown as IExtededNodeProps) as TNode;
    }
    resolveRootNode(nodes: Node[]): Node {
        return nodes.length > 0 ? nodes[0] : new ExtendedNode(this);
    }
    render(outs: Record<string, Sym<any>>): void {
        return;
    }
}

describe('Context', () => {
    let context: ExtendedContext;
    let contextProps: IContextSerialized;
    let contextWithProps: ExtendedContext;

    beforeEach(() => {
        context = new ExtendedContext();

        contextProps = {
            id: '123',
            name: 'Extended',
            nodes: [
                [
                    '123',
                    {
                        id: '123',
                        name: 'My Node',
                        type: 'MyType',
                        inputs: {},
                        outputs: {
                            output: {
                                id: '123',
                                name: 'A',
                                type: 'float'
                            }
                        },
                        data: {
                            position: {
                                x: 100,
                                y: 200
                            }
                        }
                    }
                ],
                [
                    '456',
                    {
                        id: '456',
                        name: 'My Second Node',
                        type: 'MySecondType',
                        inputs: {
                            input: {
                                id: '456',
                                name: 'A',
                                type: 'float',
                                defaultValue: float(0),
                                value: float(1)
                            }
                        },
                        outputs: {},
                        data: {
                            position: {
                                x: 200,
                                y: 300
                            }
                        }
                    }
                ]
            ],
            connections: [
                [
                    '123',
                    {
                        id: '123',
                        from: '123',
                        to: '456'
                    }
                ]
            ]
        };

        contextWithProps = new ExtendedContext(contextProps);
    });

    it('should initialize with all necessary properties', () => {
        expect(context.id).toBeDefined();
        expect(context.name).toBe('Untitled');
        expect(context.root).toBeDefined();
        expect(context.nodes.size).toBe(1);
        expect(context.connections.size).toBe(0);
        expect(context.props).toBeDefined();
    });

    it('should initialize with given properties', () => {
        expect(contextWithProps.id).toBe(contextProps.id);
        expect(contextWithProps.name).toBe(contextProps.name);
        expect(contextWithProps.root).toBeDefined();
        expect(contextWithProps.nodes.size).toBe(2);
        expect(contextWithProps.connections.size).toBe(1);
        expect(contextWithProps.props).toEqual(contextProps);
    });
});
