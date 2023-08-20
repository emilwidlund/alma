import { float, Prim, degrees } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { IRadiansNodeInputs, IRadiansNodeOutputs, IRadiansNodeProps } from './RadiansNode.types';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class RadiansNode extends PolymorphicNode {
    static description = 'Returns (PI * degrees) / 180.';
    static nodeName = 'Radians';
    type = WebGLNodeType.RADIANS;

    declare inputs: IRadiansNodeInputs;
    declare outputs: IRadiansNodeOutputs;

    constructor(context: WebGLContext, props: IRadiansNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'float',
                    options: ['float', 'vec2', 'vec3', 'vec4']
                }
            }
        });

        super(context, props);

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
