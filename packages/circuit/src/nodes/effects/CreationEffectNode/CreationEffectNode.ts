import { INodeProps } from '@usealma/graph';
import _ from 'lodash';

import { Circuit } from '../../../models/Circuit/Circuit';
import { WebGLNodeType } from '../../../types';
import { GLSLNode } from '../../common/GLSLNode/GLSLNode';
import { IGLSLNodeProps } from '../../common/GLSLNode/GLSLNode.types';

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
    static icon = 'stream';
    static description =
        'Creation is an effect, originally made by Danilo Guanabara, which utilizes various shaping functions.';
    static glsl = frag;

    type = WebGLNodeType.CREATION_EFFECT;

    constructor(circuit: Circuit, props: INodeProps) {
        _.defaultsDeep(props, {
            data: {
                glsl: CreationEffectNode.glsl
            }
        });

        super(circuit, props as IGLSLNodeProps);
    }
}
