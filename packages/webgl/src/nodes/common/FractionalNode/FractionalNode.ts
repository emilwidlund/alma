import { float, fract, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { IFractionalNodeInputs, IFractionalNodeOutputs, IFractionalNodeProps } from './FractionalNode.types';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class FractionalNode extends PolymorphicNode {
    static description = 'Computes the fractional part of the input.';
    static nodeName = 'Fractional';
    type = WebGLNodeType.FRACTIONAL;

    declare inputs: IFractionalNodeInputs;
    declare outputs: IFractionalNodeOutputs;

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
                        return fract(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
