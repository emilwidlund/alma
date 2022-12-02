import { Sym, texture, vec4 } from '@thi.ng/shader-ast';
import { fragUV } from '@thi.ng/shader-ast-stdlib';
import { Texture } from '@thi.ng/webgl';
import { Node, IOutputProps, Output, Input, IInputProps } from 'alma-graph';
import { defaults, defaultsDeep } from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { isPromise } from '../../../utils/random/predicates';
import { ITextureNodeData, ITextureNodeInputs, ITextureNodeOutputs, ITextureNodeProps } from './TextureNode.types';

export class TextureNode extends Node {
    static icon = 'texture';
    static nodeName = 'Texture';
    static description = 'Represents an image, fetched from the provided URI.';

    type = WebGLNodeType.TEXTURE;
    inputs!: ITextureNodeInputs;
    outputs!: ITextureNodeOutputs;
    data: ITextureNodeData;
    textureId!: string;
    texture!: Texture;

    constructor(context: WebGLContext, props: ITextureNodeProps) {
        super(context, props);

        this.data = defaultsDeep(props.data, {
            uri: 'https://pbs.twimg.com/profile_images/1543286859828174849/2JmJgBEK_400x400.jpg',
            position: {
                x: 0,
                y: 0
            }
        });

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

        const [textureId, tex] = context.textureManager.create();

        this.textureId = textureId;
        this.texture = tex;

        this.outputs = {
            texture: new Output(
                this,
                defaults<Partial<IOutputProps<'vec4'>> | undefined, IOutputProps<'vec4'>>(props.outputs?.texture, {
                    name: 'Texture',
                    type: 'vec4',
                    value: () => {
                        const sampler = context.uniforms[this.textureId] as Sym<'sampler2D'>;
                        return sampler ? texture(sampler, this.resolveValue(this.inputs.uv.value)) : vec4(0, 0, 0, 1);
                    }
                })
            )
        };

        const image = context.textureManager.textureResolver(props.data.uri);

        if (isPromise(image)) {
            image.then(data => {
                context.textureManager.update(textureId, data);
            });
        } else {
            context.textureManager.update(textureId, image);
        }
    }
}
