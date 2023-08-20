import { INodeProps } from '@usealma/graph';
import _ from 'lodash';

import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';
import { GLSLNode } from '../../glsl/GLSLNode/GLSLNode';
import { IGLSLNodeProps } from '../../glsl/GLSLNode/GLSLNode.types';

const frag = `vec4 creation(in vec2 uv, in float time) {
	vec3 c;
	float l, z = abs(time);

	for(int i = 0; i < 3; i++) {
		vec2 u, p = uv / 2.;
		u = p;
		z += .07;
		l = length(p);
		u += p / l * (sin(z) + 1.) * abs(sin(l * 9. - z - z));
		c[i] = .01 / length(mod(u, 1.) - .5);
	}
	
	return vec4(c / l, abs(time));
}`;

export class CreationEffectNode extends GLSLNode {
    static nodeName = 'Creation';
    static description = 'Creation is an effect, originally made by Danilo Guanabara, which utilizes various shaping functions.';
    static glsl = frag;

    type = WebGLNodeType.CREATION_EFFECT;

    constructor(context: WebGLContext, props: INodeProps) {
        _.defaultsDeep(props, {
            data: {
                glsl: CreationEffectNode.glsl
            }
        });

        super(context, props as IGLSLNodeProps);
    }
}
