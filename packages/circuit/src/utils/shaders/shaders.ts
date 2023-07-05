import {
    $x,
    $xy,
    $y,
    add,
    assign,
    defn,
    div,
    float,
    FLOAT1,
    gt,
    ifThen,
    mul,
    ret,
    sym,
    Vec2Term,
    Vec4Term
} from '@thi.ng/shader-ast';

export const aspectCorrectedUV = defn('vec2', 'aspectCorrectedUV', ['vec2', 'vec2'], (pos, res) => {
    let uv;
    return [(uv = sym(div(pos, res))), assign($x(uv), mul($x(uv), div($x(res), $y(res)))), ret(uv)];
});

export const fragUV = (fragCoord: Vec4Term, res: Vec2Term) => div($xy(fragCoord), res);

export const aspectCorrectedTextureUV = defn(
    'vec2',
    'aspectCorrectedTextureUV',
    ['float', 'vec2', 'vec2'],
    (textureAspect, fragCoord, frameResolution) => {
        let frameAspect;
        let textureFrameRatio;
        let uv;

        return [
            (frameAspect = sym(div($x(frameResolution), $y(frameResolution)))),
            (textureFrameRatio = sym(div(textureAspect, frameAspect))),
            (uv = sym(div(fragCoord, frameResolution))),
            ifThen(
                gt(FLOAT1, textureAspect),
                [
                    assign($y(uv), mul($y(uv), textureFrameRatio)),
                    assign($y(uv), add($y(uv), div(textureFrameRatio, 2.0)))
                ],
                [
                    ifThen(
                        gt(textureAspect, FLOAT1),
                        [assign($x(uv), mul($x(uv), textureFrameRatio))],
                        [assign($y(uv), mul($y(uv), textureFrameRatio)), assign($y(uv), add($y(uv), float(0.25)))]
                    )
                ]
            ),
            ret(uv)
        ];
    }
);
