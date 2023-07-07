import { Node, IOutputProps, Output } from '@usealma/graph';
import { defaults } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { IResolutionNodeInputs, IResolutionNodeOutputs, IResolutionNodeProps } from './ResolutionNode.types';

export class ResolutionNode extends Node {
    static icon = 'panorama';
    static description = 'Resolution of the WebGL preview window.';

    static nodeName = 'Resolution';
    type = WebGLNodeType.RESOLUTION;

    inputs: IResolutionNodeInputs;
    outputs: IResolutionNodeOutputs;

    constructor(circuit: Circuit, props: IResolutionNodeProps = {}) {
        super(circuit, props);

        this.inputs = {};

        this.outputs = {
            resolution: new Output(
                this,
                defaults<Partial<IOutputProps<'vec2'>> | undefined, IOutputProps<'vec2'>>(props.outputs?.resolution, {
                    name: 'Resolution',
                    type: 'vec2',
                    value: () => {
                        return circuit.uniforms.resolution;
                    }
                })
            )
        };
    }
}
