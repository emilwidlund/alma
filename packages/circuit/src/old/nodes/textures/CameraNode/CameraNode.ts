import { $xy, float, Sym, texture, vec4 } from '@thi.ng/shader-ast';
import { Node, IOutputProps, Output } from '@usealma/graph';
import { defaults } from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { aspectCorrectedTextureUV } from '../../../utils/shaders/shaders';
import { ICameraNodeInputs, ICameraNodeOutputs, ICameraNodeProps } from './CameraNode.types';

export class CameraNode extends Node {
    static icon = 'camera';
    static description = 'Resolves a texture from the Webcam on desktop or Camera on phone.';

    static nodeName = 'Camera';
    type = WebGLNodeType.CAMERA;

    inputs: ICameraNodeInputs;
    outputs: ICameraNodeOutputs;

    constructor(circuit: Circuit, props: ICameraNodeProps = {}) {
        super(circuit, props);

        if (!circuit.cameraManager.initialized) {
            circuit.cameraManager.start();
        }

        this.inputs = {};

        this.outputs = {
            camera: new Output(
                this,
                defaults<Partial<IOutputProps<'vec4'>> | undefined, IOutputProps<'vec4'>>(props.outputs?.camera, {
                    name: 'Texture',
                    type: 'vec4',
                    value: () => {
                        const sampler = circuit.uniforms[circuit.cameraManager.textureId] as Sym<'sampler2D'>;
                        return sampler
                            ? texture(
                                  sampler,
                                  aspectCorrectedTextureUV(
                                      circuit.uniforms[`${circuit.cameraManager.textureId}AspectRatio`] || float(1),
                                      $xy(circuit.target.gl_FragCoord),
                                      circuit.uniforms.resolution
                                  )
                              )
                            : vec4(0, 0, 0, 1);
                    }
                })
            )
        };
    }
}
