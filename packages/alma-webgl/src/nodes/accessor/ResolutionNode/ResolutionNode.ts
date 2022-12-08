import { Node, IOutputProps, Output } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { IResolutionNodeInputs, IResolutionNodeOutputs, IResolutionNodeProps } from './ResolutionNode.types';

export class ResolutionNode extends Node {
    static icon = 'panorama';
    static description = 'Resolution of the WebGL preview window.';

    static nodeName = 'Resolution';
    type = WebGLNodeType.RESOLUTION;

    inputs: IResolutionNodeInputs;
    outputs: IResolutionNodeOutputs;

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
                        return context.uniforms.resolution;
                    }
                })
            )
        };
    }
}
