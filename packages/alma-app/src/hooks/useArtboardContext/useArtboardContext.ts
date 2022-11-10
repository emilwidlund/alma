import {
    $xy,
    add,
    assign,
    defMain,
    defn,
    float,
    FloatSym,
    ret,
    sym,
    Sym,
    vec2,
    Vec2Sym,
    vec3,
    vec4
} from '@thi.ng/shader-ast';
import { additive, fit1101, snoise2 } from '@thi.ng/shader-ast-stdlib';
import { compileModel, defQuadModel, defShader, draw, FX_SHADER_SPEC, ModelSpec } from '@thi.ng/webgl';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { useCallback, useRef } from 'react';

export const useArtboardContext = () => {
    const glRef = useRef<GLView>(null);
    const frameId = useRef<number>();
    const renderingStartedTimestamp = useRef<number>();

    const renderingLoop = useCallback((gl: ExpoWebGLRenderingContext, model: ModelSpec) => {
        frameId.current = requestAnimationFrame(renderingLoop.bind(this, gl, model));

        if (renderingStartedTimestamp.current) {
            model.uniforms!.time = (Date.now() - renderingStartedTimestamp.current) / 100;
        }

        draw(model);

        gl.endFrameEXP();
    }, []);

    const onContextCreate = useCallback(
        async (gl: ExpoWebGLRenderingContext) => {
            const mainImage = defn('vec4', 'mainImage', ['vec2', 'vec2', 'float'], (fragCoord, res, time) => {
                let uv: Vec2Sym;
                let col: FloatSym;
                return [
                    (uv = sym(aspectCorrectedUV(fragCoord, res))),
                    // dynamically create a multi-octave version of `snoise2`
                    // computed over 4 octaves w/ given phase shift and decay
                    // factor (both per octave)
                    (col = sym(additive('vec2', snoise2, 4)(add(uv, time), vec2(2), float(0.5)))),
                    ret(vec4(vec3(fit1101(col)), 1))
                ];
            });

            const model = compileModel(gl, {
                ...defQuadModel({ uv: false }),
                shader: defShader(gl, {
                    ...FX_SHADER_SPEC,
                    vs: (gl, _, attribs) => [defMain(() => [assign(gl.gl_Position, vec4(attribs.position, 0, 1))])],
                    fs: (gl, unis, _, outs) => [
                        mainImage,
                        defMain(() => [
                            assign(outs.fragColor, mainImage($xy(gl.gl_FragCoord), unis.resolution, unis.time))
                        ])
                    ],
                    attribs: {
                        position: 'vec2'
                    },
                    uniforms: {
                        resolution: ['vec2', [gl.drawingBufferWidth, gl.drawingBufferHeight]],
                        time: ['float', 0]
                    }
                })
            });

            console.log(model);

            frameId.current = requestAnimationFrame(renderingLoop.bind(this, gl, model));
        },
        [renderingLoop]
    );

    return {
        glRef,
        onContextCreate
    };
};
function aspectCorrectedUV(fragCoord: Sym<'vec2'>, res: Sym<'vec2'>): any {
    throw new Error('Function not implemented.');
}
