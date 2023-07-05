import { float, inversesqrt, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import {
    IInverseSquareRootNodeInputs,
    IInverseSquareRootNodeOutputs,
    IInverseSquareRootNodeProps
} from './InverseSquareRootNode.types';

export class InverseSquareRootNode extends PolymorphicNode {
    static icon = 'file_download_done';
    static description = 'Returns the inverse square root of the given input.';

    static nodeName = 'Inverse Square Root';
    type = WebGLNodeType.INVERSE_SQUARE_ROOT;

    inputs: IInverseSquareRootNodeInputs;
    outputs: IInverseSquareRootNodeOutputs;

    constructor(circuit: Circuit, props: IInverseSquareRootNodeProps = {}) {
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
                        return inversesqrt<Prim>(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
