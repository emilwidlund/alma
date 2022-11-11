import { float, sin } from '@thi.ng/shader-ast';
import { Input, IInputProps, Node, Output, IOutputProps } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../../client/webgl/models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../types';
import { ISineNodeInputs, ISineNodeOutputs, ISineNodeProps } from './SineNode.types';

export class SineNode extends Node {
    static icon = 'all_inclusive';
    static description = 'Performs a sine operation on input.';

    type = WebGLNodeType.SINE;

    inputs: ISineNodeInputs;
    outputs: ISineNodeOutputs;

    constructor(context: WebGLContext, props: ISineNodeProps = {}) {
        super(context, props);

        this.inputs = {
            input: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.input, {
                    name: 'Input',
                    type: 'float',
                    defaultValue: float(0)
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
                        return sin(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
