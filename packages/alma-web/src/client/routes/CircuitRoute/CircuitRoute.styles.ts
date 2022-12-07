import { css } from '@emotion/css';

export const circuitRouteWrapperStyles = css`
    --circuit-background-color: var(--dark-background);
    --circuit-dot-color: #434437;

    position: relative;
    display: flex;
    flex-direction: row;
    height: 100%;
    line-height: 1.4em;
    background-image: radial-gradient(var(--circuit-dot-color) 10%, var(--circuit-background-color) 10%);
    background-position: 0 0;
    background-size: 14px 14px;
    user-select: none;
    -webkit-user-select: none;
`;

export const contextMenuWrapperStyles = css`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 160px;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    z-index: 999;

    & > div {
        bottom: 0;
    }
`;

export const examplesMenuWrapperStyles = css`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 160px;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    z-index: 999;
    transform: translate(-100px, 0);

    & > div {
        bottom: 0;
    }
`;
