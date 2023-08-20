import { float, vec3 } from '@thi.ng/shader-ast';
import { Input, IInputProps, Node, Output, IOutputProps } from '@usealma/graph';
import { defaults } from 'lodash';

import { IVector3NodeInputs, IVector3NodeOutputs, IVector3NodeProps } from './Vector3Node.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class Vector3Node extends Node {
    static description = 'A 3-component vector.';
    static nodeName = 'Vector 3';
    type = WebGLNodeType.VECTOR_3;

    declare inputs: IVector3NodeInputs;
    declare outputs: IVector3NodeOutputs;

    constructor(context: WebGLContext, props: IVector3NodeProps = {}) {
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
            ),
            z: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.z, {
                    name: 'Z',
                    type: 'float',
                    defaultValue: float(0)
                })
            )
        };

        this.outputs = {
            vector3: new Output(
                this,
                defaults<Partial<IOutputProps<'vec3'>> | undefined, IOutputProps<'vec3'>>(props.outputs?.vector3, {
                    name: 'Vector 3',
                    type: 'vec3',
                    value: () => {
                        return vec3(
                            this.resolveValue(this.inputs.x.value),
                            this.resolveValue(this.inputs.y.value),
                            this.resolveValue(this.inputs.z.value)
                        );
                    }
                })
            )
        };
    }
}
