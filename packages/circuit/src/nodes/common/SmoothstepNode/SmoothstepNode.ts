import { float, Prim, smoothstep } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { ISmoothstepNodeInputs, ISmoothstepNodeOutputs, ISmoothstepNodeProps } from './SmoothstepNode.types';

export class SmoothstepNode extends PolymorphicNode {
    static icon = 'border_vertical';
    static description = 'Returns a smooth Hermite interpolation between 0 and 1 when Edge A < Input < Edge B.';
    static nodeName = 'Smoothstep';

    type = WebGLNodeType.SMOOTHSTEP;

    inputs: ISmoothstepNodeInputs;
    outputs: ISmoothstepNodeOutputs;

    constructor(circuit: Circuit, props: ISmoothstepNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'float',
                    options: ['float', 'vec2', 'vec3', 'vec4']
                }
            }
        });

        super(circuit, props);

        this.inputs = {
            edgeA: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.edgeA, {
                    name: 'Edge A',
                    type: 'float',
                    defaultValue: float(0)
                })
            ),
            edgeB: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.edgeB, {
                    name: 'Edge B',
                    type: 'float',
                    defaultValue: float(0)
                })
            ),
            input: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.input, {
                    name: 'Input',
                    type: 'float',
                    defaultValue: float(0)
                })
            )
        };

        this.outputs = {
            output: new Output(
                this,
                defaults<Partial<IOutputProps<Prim>> | undefined, IOutputProps<Prim>>(props.outputs?.output, {
                    name: 'Output',
                    type: 'float',
                    value: () => {
                        return smoothstep<Prim, Prim, Prim>(
                            this.resolveValue(this.inputs.edgeA.value),
                            this.resolveValue(this.inputs.edgeB.value),
                            this.resolveValue(this.inputs.input.value)
                        );
                    }
                })
            )
        };
    }
}
