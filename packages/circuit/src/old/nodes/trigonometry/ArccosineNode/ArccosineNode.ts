import { acos, float, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { IArccosineNodeInputs, IArccosineNodeOutputs, IArccosineNodeProps } from './ArccosineNode.types';

export class ArccosineNode extends PolymorphicNode {
    static icon = 'conversion_path';
    static description = 'Returns the angle whose trigonometric cosine is the input.';

    static nodeName = 'Arccosine';
    type = WebGLNodeType.ARCCOSINE;

    inputs: IArccosineNodeInputs;
    outputs: IArccosineNodeOutputs;

    constructor(circuit: Circuit, props: IArccosineNodeProps = {}) {
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
                        return acos<Prim>(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}