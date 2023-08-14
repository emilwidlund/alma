import { float, Prim, tan } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { ITangentNodeInputs, ITangentNodeOutputs, ITangentNodeProps } from './TangentNode.types';

export class TangentNode extends PolymorphicNode {
    static icon = 'swap_calls';
    static description = 'Returns the trigonometric tangent of the input.';

    static nodeName = 'Tangent';
    type = WebGLNodeType.TANGENT;

    declare inputs: ITangentNodeInputs;
    declare outputs: ITangentNodeOutputs;

    constructor(context: WebGLContext, props: ITangentNodeProps = {}) {
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
                        return tan<Prim>(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
