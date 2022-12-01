import { texture } from '@thi.ng/shader-ast';
import { fragUV } from '@thi.ng/shader-ast-stdlib';
import { Node, IOutputProps, Output, Input, IInputProps } from 'alma-graph';
import { defaults } from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { ICameraNodeInputs, ICameraNodeOutputs, ICameraNodeProps } from './CameraNode.types';

export class CameraNode extends Node {
    static icon = 'camera';
    static description = 'Resolves a texture from the Webcam on desktop or Camera on phone.';

    static nodeName = 'Camera';
    type = WebGLNodeType.CAMERA;

    inputs: ICameraNodeInputs;
    outputs: ICameraNodeOutputs;

    constructor(context: WebGLContext, props: ICameraNodeProps = {}) {
        super(context, props);

        if (!context.cameraManager.initialized) {
            context.cameraManager.start();
        }

        this.inputs = {
            uv: new Input(
                this,
                defaults<Partial<IInputProps<'vec2'>> | undefined, IInputProps<'vec2'>>(props.inputs?.uv, {
                    name: 'UV',
                    type: 'vec2',
                    defaultValue: fragUV(context.target.gl_FragCoord, context.uniforms.resolution)
                })
            )
        };

        this.outputs = {
            camera: new Output(
                this,
                defaults<Partial<IOutputProps<'vec4'>> | undefined, IOutputProps<'vec4'>>(props.outputs?.camera, {
                    name: 'Texture',
                    type: 'vec4',
                    value: () => {
                        return texture(context.uniforms.cameraTexture, this.resolveValue(this.inputs.uv.value));
                    }
                })
            )
        };
    }
}
