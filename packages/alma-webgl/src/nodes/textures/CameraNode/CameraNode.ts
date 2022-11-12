import { Node, INodeInputs, IOutputProps, Output } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { ICameraNodeOutputs, ICameraNodeProps } from './CameraNode.types';

export class CameraNode extends Node {
    static icon = 'camera';
    static description = 'Resolves a texture from the Webcam on desktop or Camera on phone.';

    type = WebGLNodeType.CAMERA;

    inputs: INodeInputs;
    outputs: ICameraNodeOutputs;

    constructor(context: WebGLContext, props: ICameraNodeProps = {}) {
        super(context, props);

        this.inputs = {};

        this.outputs = {
            camera: new Output(
                this,
                defaults<Partial<IOutputProps<'sampler2D'>> | undefined, IOutputProps<'sampler2D'>>(
                    props.outputs?.camera,
                    {
                        name: 'Texture',
                        type: 'sampler2D',
                        value: () => {
                            return context.uniforms.cameraTexture;
                        }
                    }
                )
            )
        };
    }
}
