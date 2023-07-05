import { float, cos, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { ICosineNodeInputs, ICosineNodeOutputs, ICosineNodeProps } from './CosineNode.types';

export class CosineNode extends PolymorphicNode {
    static icon = 'all_inclusive';
    static description = 'Returns the cosine of the given input.';

    static nodeName = 'Cosine';
    type = WebGLNodeType.COSINE;

    inputs: ICosineNodeInputs;
    outputs: ICosineNodeOutputs;

    constructor(circuit: Circuit, props: ICosineNodeProps = {}) {
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
                        return cos(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
