import { defn, float, FloatSym, ret, sym, vec2, vec3, vec4 } from '@thi.ng/shader-ast';
import { additive, fit1101, snoise2 } from '@thi.ng/shader-ast-stdlib';
import { Input, IInputProps, Node, Output, IOutputProps } from '@usealma/graph';
import { defaults } from 'lodash';

import { ISimplexNoiseNodeInputs, ISimplexNoiseNodeOutputs, ISimplexNoiseNodeProps } from './SimplexNoiseNode.types';
import { WebGLContext } from '../../../models/WebGLContext/WebGLContext';
import { WebGLNodeType } from '../../../types';

export class SimplexNoiseNode extends Node {
    static icon = 'snowing';
    static description =
        'The result of an n-dimensional noise function comparable to Perlin Noise but with fewer directional artifacts.';

    static nodeName = 'Simplex Noise';
    type = WebGLNodeType.SIMPLEX_NOISE;

    declare inputs: ISimplexNoiseNodeInputs;
    declare outputs: ISimplexNoiseNodeOutputs;

    constructor(context: WebGLContext, props: ISimplexNoiseNodeProps = {}) {
        super(context, props);

        this.inputs = {
            octaves: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.octaves, {
                    name: 'Octaves',
                    type: 'float',
                    defaultValue: float(4),
                    // Octaves must be a constant as it is used in a for-loop to calculate octaves
                    // @ts-ignore
                    validator: value => ('opts' in value ? value.opts.type !== 'uni' : true)
                })
            ),
            shift: new Input(
                this,
                defaults<Partial<IInputProps<'vec2'>> | undefined, IInputProps<'vec2'>>(props.inputs?.shift, {
                    name: 'Shift',
                    type: 'vec2',
                    defaultValue: vec2(2, 2)
                })
            ),
            decay: new Input(
                this,
                defaults<Partial<IInputProps<'float'>> | undefined, IInputProps<'float'>>(props.inputs?.decay, {
                    name: 'Decay',
                    type: 'float',
                    defaultValue: float(0.5)
                })
            ),
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
            output: new Output(
                this,
                defaults<Partial<IOutputProps<'vec4'>> | undefined, IOutputProps<'vec4'>>(props.outputs?.output, {
                    name: 'Output',
                    type: 'vec4',
                    value: () => {
                        return defn('vec4', 'simplexNoise', [], () => {
                            let col: FloatSym;

                            return [
                                // dynamically create a multi-octave version of `snoise2`
                                // computed over 4 octaves w/ given phase shift and decay
                                // factor (both per octave)
                                (col = sym(
                                    additive('vec2', snoise2, this.resolveValue(this.inputs.octaves.value))(
                                        this.resolveValue(this.inputs.uv.value),
                                        this.resolveValue(this.inputs.shift.value),
                                        this.resolveValue(this.inputs.decay.value)
                                    )
                                )),
                                ret(vec4(vec3(fit1101(col)), 1))
                            ];
                        });
                    }
                })
            )
        };
    }
}
