import { float, min, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLNodeType } from '../../../types';
import { IMinimumNodeInputs, IMinimumNodeOutputs, IMinimumNodeProps } from './MinimumNode.types';

export class MinimumNode extends PolymorphicNode {
    static icon = 'arrow_downward';
    static description = 'Returns the lesser value of the given inputs.';
    static nodeName = 'Minimum';

    type = WebGLNodeType.MINIMUM;

    inputs: IMinimumNodeInputs;
    outputs: IMinimumNodeOutputs;

    constructor(circuit: Circuit, props: IMinimumNodeProps = {}) {
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
            a: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.a, {
                    name: 'A',
                    type: 'float',
                    defaultValue: float(0)
                })
            ),
            b: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.b, {
                    name: 'B',
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
                        return min<Prim, Prim>(
                            this.resolveValue(this.inputs.a.value),
                            this.resolveValue(this.inputs.b.value)
                        );
                    }
                })
            )
        };
    }
}
