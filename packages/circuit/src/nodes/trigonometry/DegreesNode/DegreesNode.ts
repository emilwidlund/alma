import { float, Prim, degrees } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { IDegreesNodeInputs, IDegreesNodeOutputs, IDegreesNodeProps } from './DegreesNode.types';

export class DegreesNode extends PolymorphicNode {
    static icon = 'fiber_manual_record';
    static description = 'Returns (180.0 * radians) / PI.';
    static nodeName = 'Degrees';

    type = WebGLNodeType.DEGREES;

    inputs: IDegreesNodeInputs;
    outputs: IDegreesNodeOutputs;

    constructor(circuit: Circuit, props: IDegreesNodeProps = {}) {
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
            radians: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.radians, {
                    name: 'Radians',
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
                        return degrees(this.resolveValue(this.inputs.radians.value));
                    }
                })
            )
        };
    }
}
