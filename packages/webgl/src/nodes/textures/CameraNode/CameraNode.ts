import { $xy, float, Sym, texture, vec4 } from '@thi.ng/shader-ast';
import { Node, IOutputProps, Output } from '@usealma/graph';
import { defaults } from 'lodash';

import { ICameraNodeInputs, ICameraNodeOutputs, ICameraNodeProps } from './CameraNode.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { aspectCorrectedTextureUV } from '../../../utils/shaders/shaders';

export class CameraNode extends Node {
    static description = 'Resolves a texture from the Webcam on desktop or Camera on phone.';
    static nodeName = 'Camera';
    type = WebGLNodeType.CAMERA;

    declare inputs: ICameraNodeInputs;
    declare outputs: ICameraNodeOutputs;

    constructor(context: WebGLContext, props: ICameraNodeProps = {}) {
        super(context, props);

        if (!context.cameraManager.initialized) {
            context.cameraManager.start();
        }

        this.inputs = {};

        this.outputs = {
            camera: new Output(
                this,
                defaults<Partial<IOutputProps<'vec4'>> | undefined, IOutputProps<'vec4'>>(props.outputs?.camera, {
                    name: 'Texture',
                    type: 'vec4',
                    value: () => {
                        const sampler = context.uniforms[context.cameraManager.textureId] as Sym<'sampler2D'>;
                        return sampler
                            ? texture(
                                  sampler,
                                  aspectCorrectedTextureUV(
                                      context.uniforms[`${context.cameraManager.textureId}AspectRatio`] || float(1),
                                      $xy(context.target.gl_FragCoord),
                                      context.uniforms.uResolution
                                  )
                              )
                            : vec4(0, 0, 0, 1);
                    }
                })
            )
        };
    }
}
