import { HALF_PI, PI } from '@thi.ng/shader-ast';
import { Node, INodeInputs, IOutputProps, Output } from '@usealma/graph';
import { defaults } from 'lodash';

import { IPINodeOutputs, IPINodeProps } from './PINode.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class PINode extends Node {
    static icon = 'donut_large';
    static description = 'Utility which exposes accessors for PI and HALF_PI.';
    static nodeName = 'PI';

    type = WebGLNodeType.PI;

    declare inputs: INodeInputs;
    declare outputs: IPINodeOutputs;

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
