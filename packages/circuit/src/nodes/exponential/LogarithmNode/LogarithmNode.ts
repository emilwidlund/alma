import { float, Prim, log } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { ILogarithmNodeInputs, ILogarithmNodeOutputs, ILogarithmNodeProps } from './LogarithmNode.types';

export class LogarithmNode extends PolymorphicNode {
    static icon = 'reply_all';
    static description = 'Returns the natural logarithm of the given input.';
    static nodeName = 'Logarithm';

    type = WebGLNodeType.LOGARITHM;

    inputs: ILogarithmNodeInputs;
    outputs: ILogarithmNodeOutputs;

    constructor(circuit: Circuit, props: ILogarithmNodeProps = {}) {
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
                        return log<Prim>(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
