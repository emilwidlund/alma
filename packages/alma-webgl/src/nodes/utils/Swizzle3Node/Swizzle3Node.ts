import { vec3, $x, $y, $z } from '@thi.ng/shader-ast';
import { Input, IInputProps, Node, Output, IOutputProps } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { ISwizzle3NodeInputs, ISwizzle3NodeOutputs, ISwizzle3NodeProps } from './Swizzle3Node.types';

export class Swizzle3Node extends Node {
    static icon = 'device_hub';
    static description = 'Destructs a Vector 3 and returns its x, y & z components.';

    name = 'Swizzle 3';
    type = WebGLNodeType.SWIZZLE_3;

    inputs: ISwizzle3NodeInputs;
    outputs: ISwizzle3NodeOutputs;

    constructor(context: WebGLContext, props: ISwizzle3NodeProps = {}) {
        super(context, props);

        this.inputs = {
            vector: new Input(
                this,
                defaults<Partial<IInputProps<'vec3'>> | undefined, IInputProps<'vec3'>>(props.inputs?.vector, {
                    name: 'Vector',
                    type: 'vec3',
                    defaultValue: vec3(0, 0, 0)
                })
            )
        };

        this.outputs = {
            x: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.x, {
                    name: 'X',
                    type: 'float',
                    value: () => {
                        return $x<'vec3'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            ),
            y: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.y, {
                    name: 'Y',
                    type: 'float',
                    value: () => {
                        return $y<'vec3'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            ),
            z: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.z, {
                    name: 'Z',
                    type: 'float',
                    value: () => {
                        return $z<'vec3'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            )
        };
    }
}
