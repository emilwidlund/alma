import { float, fract } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from 'alma-graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { IFractionalNodeInputs, IFractionalNodeOutputs, IFractionalNodeProps } from './FractionalNode.types';

export class FractionalNode extends PolymorphicNode {
    static icon = 'stacked_line_chart';
    static description = 'Computes the fractional part of the input.';

    static nodeName = 'Fractional';
    type = WebGLNodeType.FRACTIONAL;

    inputs: IFractionalNodeInputs;
    outputs: IFractionalNodeOutputs;

    constructor(context: WebGLContext, props: IFractionalNodeProps = {}) {
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
            input: new Input(
                this,
                defaults<
                    Partial<IInputProps<'float' | 'vec2' | 'vec3' | 'vec4'>> | undefined,
                    IInputProps<'float' | 'vec2' | 'vec3' | 'vec4'>
                >(props.inputs?.input, {
                    name: 'Input',
                    type: 'float',
                    defaultValue: float(0)
                })
            )
        };

        this.outputs = {
            output: new Output(
                this,
                defaults<
                    Partial<IOutputProps<'float' | 'vec2' | 'vec3' | 'vec4'>> | undefined,
                    IOutputProps<'float' | 'vec2' | 'vec3' | 'vec4'>
                >(props.outputs?.output, {
                    name: 'Output',
                    type: 'float',
                    value: () => {
                        return fract(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
