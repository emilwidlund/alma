import { float, Prim, degrees } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { IRadiansNodeInputs, IRadiansNodeOutputs, IRadiansNodeProps } from './RadiansNode.types';

export class RadiansNode extends PolymorphicNode {
    static icon = 'pie_chart';
    static description = 'Returns (PI * degrees) / 180.';
    static nodeName = 'Radians';

    type = WebGLNodeType.RADIANS;

    inputs: IRadiansNodeInputs;
    outputs: IRadiansNodeOutputs;

    constructor(circuit: Circuit, props: IRadiansNodeProps = {}) {
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
            degrees: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.degrees, {
                    name: 'Degrees',
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
                        return degrees(this.resolveValue(this.inputs.degrees.value));
                    }
                })
            )
        };
    }
}
