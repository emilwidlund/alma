import { distance, Vec, vec2 } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { IDistanceNodeInputs, IDistanceNodeOutputs, IDistanceNodeProps } from './DistanceNode.types';
import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class DistanceNode extends PolymorphicNode {
    static description = 'Returns the distance between the inputs.';
    static nodeName = 'Distance';
    type = WebGLNodeType.DISTANCE;

    declare inputs: IDistanceNodeInputs;
    declare outputs: IDistanceNodeOutputs;

    constructor(context: WebGLContext, props: IDistanceNodeProps = {}) {
        defaultsDeep(props, {
            data: {
                type: {
                    selected: 'vec2',
                    options: ['vec2', 'vec3', 'vec4']
                }
            }
        });

        super(context, props, true, false);

        this.inputs = {
            a: new Input(
                this,
                defaults<Partial<IInputProps<Vec>> | undefined, IInputProps<Vec>>(props.inputs?.a, {
                    name: 'A',
                    type: 'vec2',
                    defaultValue: vec2(0, 0)
                })
            ),
            b: new Input(
                this,
                defaults<Partial<IInputProps<Vec>> | undefined, IInputProps<Vec>>(props.inputs?.b, {
                    name: 'B',
                    type: 'vec2',
                    defaultValue: vec2(0, 0)
                })
            )
        };

        this.outputs = {
            distance: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.distance, {
                    name: 'Distance',
                    type: 'float',
                    value: () => {
                        return distance<Vec, Vec>(
                            this.resolveValue(this.inputs.a.value),
                            this.resolveValue(this.inputs.b.value)
                        );
                    }
                })
            )
        };
    }
}
