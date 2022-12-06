import { HALF_PI, PI } from '@thi.ng/shader-ast';
import { Node, INodeInputs, IOutputProps, Output } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { IPINodeOutputs, IPINodeProps } from './PINode.types';

export class PINode extends Node {
    static icon = 'donut_large';
    static description = 'Utility which exposes accessors for PI and HALF_PI.';
    static nodeName = 'PI';

    type = WebGLNodeType.PI;

    inputs: INodeInputs;
    outputs: IPINodeOutputs;

    constructor(context: WebGLContext, props: IPINodeProps = {}) {
        super(context, props);

        this.inputs = {};

        this.outputs = {
            pi: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.pi, {
                    name: 'PI',
                    type: 'float',
                    value: () => {
                        return PI;
                    }
                })
            ),
            halfPi: new Output(
                this,
                defaults<Partial<IOutputProps<'float'>> | undefined, IOutputProps<'float'>>(props.outputs?.halfPi, {
                    name: 'Half PI',
                    type: 'float',
                    value: () => {
                        return HALF_PI;
                    }
                })
            )
        };
    }
}
