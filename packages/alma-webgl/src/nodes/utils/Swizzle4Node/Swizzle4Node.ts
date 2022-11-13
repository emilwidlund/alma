import { vec4, $x, $y, $z, $w } from '@thi.ng/shader-ast';
import { Input, IInputProps, Node, Output, IOutputProps } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { ISwizzle4NodeInputs, ISwizzle4NodeOutputs, ISwizzle4NodeProps } from './Swizzle4Node.types';

export class Swizzle4Node extends Node {
    static icon = 'device_hub';
    static description = 'Destructs a Vector 4 and returns its x, y, z & w components.';

    name = 'Swizzle 4';
    type = WebGLNodeType.SWIZZLE_4;

    inputs: ISwizzle4NodeInputs;
    outputs: ISwizzle4NodeOutputs;

    constructor(context: WebGLContext, props: ISwizzle4NodeProps = {}) {
        super(context, props);

        this.inputs = {
            vector: new Input(
                this,
                defaults<Partial<IInputProps<'vec4'>> | undefined, IInputProps<'vec4'>>(props.inputs?.vector, {
                    name: 'Vector',
                    type: 'vec4',
                    defaultValue: vec4(0, 0, 0, 0)
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
                        return $x<'vec4'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            ),
            y: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.y, {
                    name: 'Y',
                    type: 'float',
                    value: () => {
                        return $y<'vec4'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            ),
            z: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.y, {
                    name: 'Z',
                    type: 'float',
                    value: () => {
                        return $z<'vec4'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            ),
            w: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.w, {
                    name: 'W',
                    type: 'float',
                    value: () => {
                        return $w<'vec4'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            )
        };
    }
}
