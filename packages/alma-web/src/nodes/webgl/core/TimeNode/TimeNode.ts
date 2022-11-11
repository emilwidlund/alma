import { Node, INodeInputs, IOutputProps, Output } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../../client/webgl/models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../types';
import { ITimeNodeOutputs, ITimeNodeProps } from './TimeNode.types';

export class TimeNode extends Node {
    type = WebGLNodeType.TIME;

    inputs: INodeInputs;
    outputs: ITimeNodeOutputs;

    constructor(context: WebGLContext, props: ITimeNodeProps = {}) {
        super(context, props);

        this.inputs = {};

        this.outputs = {
            time: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.time, {
                    name: 'Time',
                    type: 'float',
                    value: () => {
                        return context.uniforms.time;
                    }
                })
            )
        };
    }
}
