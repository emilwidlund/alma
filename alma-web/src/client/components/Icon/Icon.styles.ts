import { css } from '@emotion/css';

export const iconWrapperStyles = (size?: number, color?: string) => css`
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: ${size || 24}px; /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    user-select: none;
    color: ${color};
    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
    /* Support for IE. */
    font-feature-settings: 'liga';
`;
