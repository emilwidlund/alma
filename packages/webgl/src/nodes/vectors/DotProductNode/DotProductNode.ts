import { dot, Vec, vec2 } from '@thi.ng/shader-ast';
import { Input, IInputProps, Output, IOutputProps } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { PolymorphicNode } from '../../../models/PolymorphicNode/PolymorphicNode';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { IDotProductNodeInputs, IDotProductNodeOutputs, IDotProductNodeProps } from './DotProductNode.types';

export class DotProductNode extends PolymorphicNode {
    static icon = 'multiple_stop';
    static description = 'Returns the dot product of two vectors, A and B.';
    static nodeName = 'Dot Product';

    type = WebGLNodeType.DOT_PRODUCT;

    declare inputs: IDotProductNodeInputs;
    declare outputs: IDotProductNodeOutputs;

    constructor(context: WebGLContext, props: IDotProductNodeProps = {}) {
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
            output: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.output, {
                    name: 'Output',
                    type: 'float',
                    value: () => {
                        return dot<Vec, Vec>(
                            this.resolveValue(this.inputs.a.value),
                            this.resolveValue(this.inputs.b.value)
                        );
                    }
                })
            )
        };
    }
}
