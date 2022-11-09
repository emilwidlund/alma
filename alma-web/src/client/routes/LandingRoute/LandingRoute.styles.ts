import { css } from '@emotion/css';

export const landingRouteContentOuterStyles = (accentBackground = false) => css`
    display: flex;
    flex-direction: column;
    padding: 0 64px;
    ${accentBackground
        ? `
    background-color: var(--accent-color); 
    color: var(--text-light-color);
    `
        : ''}
`;

export const landingRouteContentStyles = (padding = true) => css`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    ${padding ? `padding: 120px 0;` : ''}
    max-width: 1024px;
    min-width: 512px;
    width: 100%;

    h1,
    h2,
    h3 {
        font-weight: 500;
    }

    p {
        font-size: var(--font-size-sm);
    }
`;

export const landingRouteHeroStyles = css`
    margin-bottom: 48px;
`;
