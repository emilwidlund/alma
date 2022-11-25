import { css } from '@emotion/css';

export const headingWrapperStyles = (marginTop?: number, marginBottom?: number) => css`
    ${marginTop !== undefined ? `margin-top: ${marginTop}px;` : undefined}
    ${marginBottom !== undefined ? `margin-bottom: ${marginBottom}px;` : undefined}
`;

export const headingSignifierWrapperStyles = css`
    color: var(--accent-color);
    margin-right: 16px;
`;
