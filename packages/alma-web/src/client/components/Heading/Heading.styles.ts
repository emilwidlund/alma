import { css } from '@emotion/css';

export const headingWrapperStyles = (color?: string, marginTop?: number, marginBottom?: number) => css`
    ${marginTop !== undefined ? `margin-top: ${marginTop}px;` : undefined}
    ${marginBottom !== undefined ? `margin-bottom: ${marginBottom}px;` : undefined}
    color: ${color !== undefined ? color : `var(--text-light-color)`};
    font-weight: 500;
`;
