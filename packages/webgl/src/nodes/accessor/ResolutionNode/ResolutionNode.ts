import { Node, IOutputProps, Output } from '@usealma/graph';
import { defaults } from 'lodash';

import { IResolutionNodeInputs, IResolutionNodeOutputs, IResolutionNodeProps } from './ResolutionNode.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class ResolutionNode extends Node {
    static description = 'Resolution of the WebGL preview window.';
    static nodeName = 'Resolution';
    type = WebGLNodeType.RESOLUTION;

    declare inputs: IResolutionNodeInputs;
    declare outputs: IResolutionNodeOutputs;

    constructor(context: WebGLContext, props: IResolutionNodeProps = {}) {
        super(context, props);

        this.inputs = {};

        this.outputs = {
            resolution: new Output(
                this,
                defaults<Partial<IOutputProps<'vec2'>> | undefined, IOutputProps<'vec2'>>(props.outputs?.resolution, {
                    name: 'Resolution',
                    type: 'vec2',
                    value: () => {
                        return context.uniforms.uResolution;
                    }
                })
            )
        };
    }
}
