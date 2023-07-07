import { float, Prim, sin } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { ISineNodeInputs, ISineNodeOutputs, ISineNodeProps } from './SineNode.types';

export class SineNode extends PolymorphicNode {
    static icon = 'all_inclusive';
    static description = 'Returns the sine of the given input.';

    static nodeName = 'Sine';
    type = WebGLNodeType.SINE;

    inputs: ISineNodeInputs;
    outputs: ISineNodeOutputs;

    constructor(circuit: Circuit, props: ISineNodeProps = {}) {
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
                        return sin(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
