import { length, Vec, vec2 } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { ILengthNodeInputs, ILengthNodeOutputs, ILengthNodeProps } from './LengthNode.types';

export class LengthNode extends PolymorphicNode {
    static icon = 'call_made';
    static description = 'Returns the length (magnitude) of the input.';

    static nodeName = 'Length';
    type = WebGLNodeType.LENGTH;

    inputs: ILengthNodeInputs;
    outputs: ILengthNodeOutputs;

    constructor(circuit: Circuit, props: ILengthNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'vec2',
                    options: ['vec2', 'vec3', 'vec4']
                }
            }
        });

        super(circuit, props, true, false);

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
            length: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.length, {
                    name: 'Length',
                    type: 'float',
                    value: () => {
                        return length<Vec>(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
