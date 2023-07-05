import { float, vec4 } from '@thi.ng/shader-ast';
import { Input, IInputProps, Node, Output, IOutputProps } from '@usealma/graph';
import { defaults } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { IVector4NodeInputs, IVector4NodeOutputs, IVector4NodeProps } from './Vector4Node.types';

export class Vector4Node extends Node {
    static icon = 'polyline';
    static description = 'A 4-component vector.';

    static nodeName = 'Vector 4';
    type = WebGLNodeType.VECTOR_4;

    inputs: IVector4NodeInputs;
    outputs: IVector4NodeOutputs;

    constructor(circuit: Circuit, props: IVector4NodeProps = {}) {
        super(circuit, props);

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
            ),
            w: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.w, {
                    name: 'W',
                    type: 'float',
                    defaultValue: float(1)
                })
            )
        };

        this.outputs = {
            vector4: new Output(
                this,
                defaults<Partial<IOutputProps<'vec4'>> | undefined, IOutputProps<'vec4'>>(props.outputs?.vector4, {
                    name: 'Vector 4',
                    type: 'vec4',
                    value: () => {
                        return vec4(
                            this.resolveValue(this.inputs.x.value),
                            this.resolveValue(this.inputs.y.value),
                            this.resolveValue(this.inputs.z.value),
                            this.resolveValue(this.inputs.w.value)
                        );
                    }
                })
            )
        };
    }
}
