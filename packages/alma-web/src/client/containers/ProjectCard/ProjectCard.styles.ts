import { css } from '@emotion/css';

export const projectCardWrapperStyles = css`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    background-color: var(--panel-background);
    border-radius: 16px;
    overflow: hidden;
`;

export const projectCardMediaStyles = (url?: string) => css`
    width: 300px;
    height: 300px;
    background-color: #000;
    background-image: url(${url});
    background-position: center center;
    background-size: cover;
`;

export const projectCardContentStyles = css`
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
`;
