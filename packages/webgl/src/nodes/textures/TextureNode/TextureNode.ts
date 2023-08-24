import { $xy, float, Sym, texture, vec4 } from '@thi.ng/shader-ast';
import { Texture } from '@thi.ng/webgl';
import { Node, IOutputProps, Output } from '@usealma/graph';
import { defaults, defaultsDeep } from 'lodash';

import { ITextureNodeData, ITextureNodeInputs, ITextureNodeOutputs, ITextureNodeProps } from './TextureNode.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { isPromise } from '../../../utils/predicates/predicates';
import { aspectCorrectedTextureUV } from '../../../utils/shaders/shaders';

export class TextureNode extends Node {
    static nodeName = 'Texture';
    static description = 'Represents an image, fetched from the provided URI.';
    type = WebGLNodeType.TEXTURE;

    declare inputs: ITextureNodeInputs;
    declare outputs: ITextureNodeOutputs;
    data: ITextureNodeData;
    textureId!: string;
    texture!: Texture;

    constructor(context: WebGLContext, props: ITextureNodeProps) {
        super(context, props);

        this.data = defaultsDeep(props.data, {
            uri: 'https://source.unsplash.com/random',
            position: {
                x: 0,
                y: 0
            }
        });

        const [textureId, tex] = context.textureManager.create();

        this.textureId = textureId;
        this.texture = tex;

        this.inputs = {};

        this.outputs = {
            texture: new Output(
                this,
                defaults<Partial<IOutputProps<'vec4'>> | undefined, IOutputProps<'vec4'>>(props.outputs?.texture, {
                    name: 'Texture',
                    type: 'vec4',
                    value: () => {
                        const sampler = context.uniforms[this.textureId] as Sym<'sampler2D'>;
                        return sampler
                            ? texture(
                                  sampler,
                                  aspectCorrectedTextureUV(
                                      context.uniforms[`${this.textureId}AspectRatio`] || float(1),
                                      $xy(context.target.gl_FragCoord),
                                      context.uniforms.uResolution
                                  )
                              )
                            : vec4(0, 0, 0, 1);
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

/**
 * 
 * 
 * 
 * 
 * 
 * float textureAspect = cameraTextureResolution.x / cameraTextureResolution.y;
	float frameAspect = resolution.x / resolution.y;
	float textureFrameRatio = textureAspect / frameAspect;
	vec2 scale = vec2(1.0, 1.0);

	if (frameAspect < 1.0) {
		// scale.x = 1.0 / textureFrameRatio;
		scale.y = textureFrameRatio;
	} else {
		// scale.y = textureFrameRatio;
		scale.x = 1.0 / textureFrameRatio;
	}

	vec2 uv = fragCoord / resolution;
	uv = uv * scale;
	uv.y += (textureFrameRatio - 1.0) / 2.0;



 (textureResolution, fragCoord, frameResolution)
vec2 getAspectedCorrectedUV(vec2 _sc2, vec2 _sc3, vec2 _sc4) {
  float _sc5 = _sc2.x / _sc2.y;
  float _sc6 = _sc4.x / _sc4.y;
  float _sc7 = _sc5 / _sc6;
  vec2 _sc8 = vec2(1.0, 1.0);
  if (1.0 > _sc6) {
    _sc8.y = _sc7;
  } else {
    _sc8.x = 12.0 / _sc7;
  }
  vec2 _sc9 = _sc3 / _sc4;
  _sc9 = _sc9 * _sc8;
  _sc9.y = _sc9.y + (_sc7 - 1.0) / 2.0;
  return _sc9;
}




 * 
 * 
 * 
 * 
 * 
 * 
 */
