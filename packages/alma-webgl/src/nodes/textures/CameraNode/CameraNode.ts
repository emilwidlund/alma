import { vec2, texture } from '@thi.ng/shader-ast';
import { Node, INodeInputs, IOutputProps, Output, Input, IInputProps } from 'alma-graph';
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

        if (!context.cameraManager.initialized) {
            context.cameraManager.init();
        }

        this.inputs = {
            uv: new Input(
                this,
                defaults<Partial<IInputProps<'vec2'>> | undefined, IInputProps<'vec2'>>(props.inputs?.uv, {
                    name: 'UV',
                    type: 'vec2',
                    defaultValue: vec2(0, 0)
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
