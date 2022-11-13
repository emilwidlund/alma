import { vec2, $x, $y } from '@thi.ng/shader-ast';
import { Input, IInputProps, Node, Output, IOutputProps } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { ISwizzle2NodeInputs, ISwizzle2NodeOutputs, ISwizzle2NodeProps } from './Swizzle2Node.types';

export class Swizzle2Node extends Node {
    static icon = 'all_inclusive';
    static description = 'Destructs a Vector 2 and returns its x & y components.';

    type = WebGLNodeType.SWIZZLE_2;

    inputs: ISwizzle2NodeInputs;
    outputs: ISwizzle2NodeOutputs;

    constructor(context: WebGLContext, props: ISwizzle2NodeProps = {}) {
        super(context, props);

        this.inputs = {
            vector: new Input(
                this,
                defaults<Partial<IInputProps<'vec2'>> | undefined, IInputProps<'vec2'>>(props.inputs?.vector, {
                    name: 'Vector',
                    type: 'vec2',
                    defaultValue: vec2(0, 0)
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
                        return $x<'vec2'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            ),
            y: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.y, {
                    name: 'Y',
                    type: 'float',
                    value: () => {
                        return $y<'vec2'>(this.resolveValue(this.inputs.vector.value));
                    }
                })
            )
        };
    }
}
