import { Node, INodeInputs, IOutputProps, Output } from '@usealma/graph';
import { defaults } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { ITimeNodeOutputs, ITimeNodeProps } from './TimeNode.types';

export class TimeNode extends Node {
    static icon = 'timer';
    static description = 'The amount of seconds that has elapsed since rendering began.';

    static nodeName = 'Time';
    type = WebGLNodeType.TIME;

    inputs: INodeInputs;
    outputs: ITimeNodeOutputs;

    constructor(circuit: Circuit, props: ITimeNodeProps = {}) {
        super(circuit, props);

        this.inputs = {};

        this.outputs = {
            time: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.time, {
                    name: 'Time',
                    type: 'float',
                    value: () => {
                        return circuit.uniforms.time;
                    }
                })
            )
        };
    }
}
