import { css } from '@emotion/css';

import { HIERARCHY } from '../../constants/hierarchy';

export const circuitRouteWrapperStyles = css`
    --circuit-background-color: var(--dark-background);
    --circuit-dot-color: #434437;

    position: relative;
    display: flex;
    flex-direction: row;
    height: 100%;
    line-height: 1.4em;
    background-image: radial-gradient(var(--circuit-dot-color) 5%, var(--circuit-background-color) 5%);
    background-position: 0 0;
    background-size: 30px 30px;
    user-select: none;
    -webkit-user-select: none;
`;

export const circuitRouteHeaderStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    margin: 48px 0 0 48px;
    z-index: ${HIERARCHY.header};

    span {
        font-size: 18px;
        margin-left: 24px;
        color: rgba(255, 255, 255, 0.8);
    }
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
