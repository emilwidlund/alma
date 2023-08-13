import { float, max, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { IMaximumNodeInputs, IMaximumNodeOutputs, IMaximumNodeProps } from './MaximumNode.types';

export class MaximumNode extends PolymorphicNode {
    static icon = 'arrow_upward';
    static description = 'Returns the greater value of the given inputs.';
    static nodeName = 'Maximum';

    type = WebGLNodeType.MAXIMUM;

    declare inputs: IMaximumNodeInputs;
    declare outputs: IMaximumNodeOutputs;

    constructor(context: WebGLContext, props: IMaximumNodeProps = {}) {
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
                        return max<Prim, Prim>(
                            this.resolveValue(this.inputs.a.value),
                            this.resolveValue(this.inputs.b.value)
                        );
                    }
                })
            )
        };
    }
}
