import { float, Prim, exp } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import {
    IExponentiationNodeInputs,
    IExponentiationNodeOutputs,
    IExponentiationNodeProps
} from './ExponentiationNode.types';

export class ExponentiationNode extends PolymorphicNode {
    static icon = 'monitoring';
    static description = 'Returns the natural exponentiation of the given input.';
    static nodeName = 'Exponentiation';

    type = WebGLNodeType.EXPONENTIATION;

    inputs: IExponentiationNodeInputs;
    outputs: IExponentiationNodeOutputs;

    constructor(circuit: Circuit, props: IExponentiationNodeProps = {}) {
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
                        return exp<Prim>(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
