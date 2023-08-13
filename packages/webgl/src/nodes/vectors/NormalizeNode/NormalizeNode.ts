import { normalize, Vec, vec2 } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { INormalizeNodeInputs, INormalizeNodeOutputs, INormalizeNodeProps } from './NormalizeNode.types';

export class NormalizeNode extends PolymorphicNode {
    static icon = 'keyboard_double_arrow_down';
    static description = 'Returns a vector of the same direction as the input, but with length 1.';

    static nodeName = 'Normalize';
    type = WebGLNodeType.NORMALIZE;

    declare inputs: INormalizeNodeInputs;
    declare outputs: INormalizeNodeOutputs;

    constructor(context: WebGLContext, props: INormalizeNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'vec2',
                    options: ['vec2', 'vec3', 'vec4']
                }
            }
        });

        super(context, props);

        const input = new Input(
            this,
            defaults<Partial<IInputProps<Vec>> | undefined, IInputProps<Vec>>(props.inputs?.input, {
                name: 'Input',
                type: 'vec2',
                defaultValue: vec2(0, 0)
            })
        );

        this.inputs = {
            input
        };

        this.outputs = {
            output: new Output(
                this,
                defaults<Partial<IOutputProps<Vec>> | undefined, IOutputProps<Vec>>(props.outputs?.output, {
                    name: 'Output',
                    get type() {
                        return input.type;
                    },
                    value: () => {
                        return normalize<Vec>(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
