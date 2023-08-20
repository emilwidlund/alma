import { float, floor, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { IFloorNodeInputs, IFloorNodeOutputs, IFloorNodeProps } from './FloorNode.types';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class FloorNode extends PolymorphicNode {
    static description = 'Returns a value equal to the nearest integer that is less than or equal to the input.';
    static nodeName = 'Floor';
    type = WebGLNodeType.FLOOR;

    declare inputs: IFloorNodeInputs;
    declare outputs: IFloorNodeOutputs;

    constructor(context: WebGLContext, props: IFloorNodeProps = {}) {
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
                        return floor(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
