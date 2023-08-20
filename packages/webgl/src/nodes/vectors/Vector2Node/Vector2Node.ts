import { float, vec2 } from '@thi.ng/shader-ast';
import { Input, IInputProps, Node, Output, IOutputProps } from '@usealma/graph';
import { defaults } from 'lodash';

import { IVector2NodeInputs, IVector2NodeOutputs, IVector2NodeProps } from './Vector2Node.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class Vector2Node extends Node {
    static description = 'A 2-component vector.';
    static nodeName = 'Vector 2';
    type = WebGLNodeType.VECTOR_2;

    declare inputs: IVector2NodeInputs;
    declare outputs: IVector2NodeOutputs;

    constructor(context: WebGLContext, props: IVector2NodeProps = {}) {
        super(context, props);

        this.inputs = {
            x: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.x, {
                    name: 'X',
                    type: 'float',
                    defaultValue: float(0)
                })
            ),
            y: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.y, {
                    name: 'Y',
                    type: 'float',
                    defaultValue: float(0)
                })
            )
        };

        this.outputs = {
            vector2: new Output(
                this,
                defaults<Partial<IOutputProps<'vec2'>> | undefined, IOutputProps<'vec2'>>(props.outputs?.vector2, {
                    name: 'Vector 2',
                    type: 'vec2',
                    value: () => {
                        return vec2(this.resolveValue(this.inputs.x.value), this.resolveValue(this.inputs.y.value));
                    }
                })
            )
        };
    }
}
