import { vec4 } from '@thi.ng/shader-ast';
import { Node, IInputProps, Input, INodeOutputs } from '@usealma/graph';
import { defaults } from 'lodash';

import { IWebGLContextNodeInputs, IWebGLContextNodeProps } from './WebGLContextNode.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class WebGLContextNode extends Node {
    static description = 'Root node of the graph. Injects its color to the renderer.';
    static nodeName = 'WebGL Context';
    type = WebGLNodeType.WEBGL_CONTEXT;

    declare inputs: IWebGLContextNodeInputs;
    declare outputs: INodeOutputs;

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
