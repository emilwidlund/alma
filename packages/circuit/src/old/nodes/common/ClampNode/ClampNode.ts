import { clamp, float, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { IClampNodeInputs, IClampNodeOutputs, IClampNodeProps } from './ClampNode.types';

export class ClampNode extends PolymorphicNode {
    static icon = 'unfold_less';
    static description = 'Returns the value of input constrained between the range min to max.';

    static nodeName = 'Clamp';
    type = WebGLNodeType.CLAMP;

    inputs: IClampNodeInputs;
    outputs: IClampNodeOutputs;

    constructor(circuit: Circuit, props: IClampNodeProps = {}) {
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
            ),
            min: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.input, {
                    name: 'Min',
                    type: 'float',
                    defaultValue: float(0)
                })
            ),
            max: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.input, {
                    name: 'Max',
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
                        return clamp<Prim, Prim, Prim>(
                            this.resolveValue(this.inputs.input.value),
                            this.resolveValue(this.inputs.min.value),
                            this.resolveValue(this.inputs.max.value)
                        );
                    }
                })
            )
        };
    }
}
