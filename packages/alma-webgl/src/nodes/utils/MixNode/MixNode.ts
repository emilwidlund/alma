import { float, mix, Prim, vec2, vec3, vec4 } from '@thi.ng/shader-ast';
import { Input, IInputProps, Node, Output, IOutputProps } from 'alma-graph';
import { defaults, defaultsDeep } from 'lodash';
import { reaction, IReactionDisposer, makeObservable, computed } from 'mobx';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { IMixNodeData, IMixNodeInputs, IMixNodeOutputs, IMixNodeProps } from './MixNode.types';

export class MixNode extends Node {
    static icon = 'tonality';
    static description = 'Performs a linear interpolation between A and B using T to weight between them.';

    type = WebGLNodeType.MIX;

    inputs: IMixNodeInputs;
    outputs: IMixNodeOutputs;
    data!: IMixNodeData;
    reactionDisposer: IReactionDisposer;

    constructor(context: WebGLContext, props: IMixNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'float',
                    options: ['float', 'vec2', 'vec3', 'vec4']
                }
            }
        });

        super(context, props);

        const inputA = new Input(
            this,
            defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.a, {
                name: 'A',
                type: 'float',
                defaultValue: float(0)
            })
        );

        const inputB = new Input(
            this,
            defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.b, {
                name: 'B',
                type: 'float',
                defaultValue: float(0)
            })
        );

        this.inputs = {
            a: inputA,
            b: inputB,
            t: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.t, {
                    name: 'T',
                    type: 'float',
                    defaultValue: float(0)
                })
            )
        };

        this.outputs = {
            output: new Output(
                this,
                // @ts-ignore
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.output, {
                    name: 'Output',
                    get type() {
                        return inputA.type;
                    },
                    value: () => {
                        return mix(
                            // @ts-ignore
                            this.resolveValue(this.inputs.a.value),
                            // @ts-ignore
                            this.resolveValue(this.inputs.b.value),
                            this.resolveValue(this.inputs.t.value)
                        );
                    }
                })
            )
        };

        makeObservable(this, {
            typeSafeValue: computed
        });

        this.reactionDisposer = reaction(
            () => this.data.type?.selected,
            (type, previous) => {
                if (type !== previous) {
                    this.inputs.a.dispose();
                    this.inputs.b.dispose();
                    this.outputs.output.dispose();

                    this.inputs.a.setValue(this.typeSafeValue);
                    this.inputs.b.setValue(this.typeSafeValue);

                    if (type) {
                        this.inputs.a.type = type;
                        this.inputs.b.type = type;
                        this.outputs.output.type = type;
                    }
                }
            }
        );
    }

    get typeSafeValue() {
        switch (this.data.type?.selected) {
            case 'vec2':
                return vec2(0, 0);
            case 'vec3':
                return vec3(0, 0, 0);
            case 'vec4':
                return vec4(0, 0, 0, 1);
            default:
                return float(0);
        }
    }

    /** Disposes the Node */
    public dispose() {
        super.dispose();

        this.reactionDisposer();
    }
}
