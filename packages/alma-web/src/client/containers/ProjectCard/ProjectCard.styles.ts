import { css } from '@emotion/css';

export const projectCardWrapperStyles = css`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
`;

export const projectCardMediaStyles = (url?: string) => css`
    width: 300px;
    height: 360px;
    background-color: #000;
    background-image: url(${url});
    background-position: center center;
    background-size: cover;
    border-radius: 32px;
`;

export const projectCardCanvasStyles = css`
    width: 300px;
    height: 360px;
    border-radius: 32px;
`;

export const projectCardContentStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 32px;
    color: var(--text-light-color);
`;

export const projectCardUpdatedAtStyles = css`
    color: var(--text-neutral-color);
`;
