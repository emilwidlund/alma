import { float, cos } from '@thi.ng/shader-ast';
import { Input, IInputProps, Node, Output, IOutputProps } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { ICosineNodeInputs, ICosineNodeOutputs, ICosineNodeProps } from './CosineNode.types';

export class CosineNode extends Node {
    static icon = 'all_inclusive';
    static description = 'Performs a cosine operation on input.';

    name = 'Cosine';
    type = WebGLNodeType.COSINE;

    inputs: ICosineNodeInputs;
    outputs: ICosineNodeOutputs;

    constructor(context: WebGLContext, props: ICosineNodeProps = {}) {
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
                        return cos(this.resolveValue(this.inputs.input.value));
                    }
                })
            )
        };
    }
}
