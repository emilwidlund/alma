import { abs, float, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { IAbsoluteNodeInputs, IAbsoluteNodeOutputs, IAbsoluteNodeProps } from './AbsoluteNode.types';

export class AbsoluteNode extends PolymorphicNode {
    static icon = 'call_missed_outgoing';
    static description = 'Computes the absolute value of the input.';

    static nodeName = 'Absolute';
    type = WebGLNodeType.ABSOLUTE;

    inputs: IAbsoluteNodeInputs;
    outputs: IAbsoluteNodeOutputs;

    constructor(circuit: Circuit, props: IAbsoluteNodeProps = {}) {
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
                        return abs(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
