import { atan, float, Prim } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { IArctangentNodeInputs, IArctangentNodeOutputs, IArctangentNodeProps } from './ArctangentNode.types';

export class ArctangentNode extends PolymorphicNode {
    static icon = 'conversion_path';
    static description = `Returns the angle whose trigonometric arctangent is x, y. The signs of x and y are used to determine the quadrant that the angle lies in. The values returned are in the range -PI and PI. Results are undefined if x is zero.`;

    static nodeName = 'Arctangent';
    type = WebGLNodeType.ARCTANGENT;

    declare inputs: IArctangentNodeInputs;
    declare outputs: IArctangentNodeOutputs;

    constructor(context: WebGLContext, props: IArctangentNodeProps = {}) {
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
            y: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.y, {
                    name: 'Y',
                    type: 'float',
                    defaultValue: float(0)
                })
            ),
            x: new Input(
                this,
                defaults<Partial<IInputProps<Prim>> | undefined, IInputProps<Prim>>(props.inputs?.x, {
                    name: 'X',
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
                        return atan<Prim, Prim>(
                            this.resolveValue(this.inputs.y.value),
                            this.resolveValue(this.inputs.x.value)
                        );
                    }
                })
            )
        };
    }
}
