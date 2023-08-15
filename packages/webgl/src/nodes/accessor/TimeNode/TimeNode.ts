import { Node, INodeInputs, IOutputProps, Output } from '@usealma/graph';
import { defaults } from 'lodash';

import { ITimeNodeOutputs, ITimeNodeProps } from './TimeNode.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class TimeNode extends Node {
    static icon = 'timer';
    static description = 'The amount of seconds that has elapsed since rendering began.';

    static nodeName = 'Time';
    type = WebGLNodeType.TIME;

    declare inputs: INodeInputs;
    declare outputs: ITimeNodeOutputs;

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
                        return context.uniforms.uTime;
                    }
                })
            )
        };
    }
}
