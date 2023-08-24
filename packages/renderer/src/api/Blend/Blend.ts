import { Blend } from '@thi.ng/webgl';

export const BlendFn = {
    NONE: [Blend.ZERO, Blend.ZERO],
    NORMAL: [Blend.SRC_ALPHA, Blend.ONE_MINUS_SRC_ALPHA],
    ADD: [Blend.SRC_ALPHA, Blend.DST_ALPHA],
    SCREEN: [Blend.ONE, Blend.ONE_MINUS_SRC_COLOR],
    MULTIPLY: [Blend.ONE_MINUS_SRC_ALPHA, Blend.DST_COLOR],
    OVERLAY: [Blend.SRC_ALPHA, Blend.ONE]
};
