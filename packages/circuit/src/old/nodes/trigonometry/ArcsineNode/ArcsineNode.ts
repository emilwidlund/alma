import { asin, float, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { IArcsineNodeInputs, IArcsineNodeOutputs, IArcsineNodeProps } from './ArcsineNode.types';

export class ArcsineNode extends PolymorphicNode {
    static icon = 'conversion_path';
    static description = 'Returns the angle whose trigonometric sine is the input.';

    static nodeName = 'Arcsine';
    type = WebGLNodeType.ARCSINE;

    inputs: IArcsineNodeInputs;
    outputs: IArcsineNodeOutputs;

    constructor(circuit: Circuit, props: IArcsineNodeProps = {}) {
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
                        return asin<Prim>(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
