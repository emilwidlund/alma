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
`;

export const landingRouteHeroStyles = css`
    margin-bottom: 48px;
`;
