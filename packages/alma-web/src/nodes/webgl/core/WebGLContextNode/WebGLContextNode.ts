import { vec4 } from '@thi.ng/shader-ast';
import { Node, IInputProps, Input, INodeOutputs } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../../client/models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../types';
import { IWebGLContextNodeInputs, IWebGLContextNodeProps } from './WebGLContextNode.types';

export class WebGLContextNode extends Node {
    type = WebGLNodeType.WEBGL_CONTEXT;

    inputs: IWebGLContextNodeInputs;
    outputs: INodeOutputs;

    constructor(context: WebGLContext, props: IWebGLContextNodeProps = {}) {
        super(context, props);

        this.inputs = {
            color: new Input(
                this,
                defaults<Partial<IInputProps<'vec4'>> | undefined, IInputProps<'vec4'>>(props.inputs?.color, {
                    name: 'Color',
                    type: 'vec4',
                    defaultValue: vec4(0, 0, 0, 1)
                })
            )
        };

        this.outputs = {};
    }
}
