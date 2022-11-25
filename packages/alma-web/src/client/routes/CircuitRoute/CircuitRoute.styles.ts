import { css } from '@emotion/css';

export const circuitRouteWrapperStyles = css`
    --circuit-background-color: var(--dark-background);
    --circuit-dot-color: #434437;

    position: relative;
    display: flex;
    flex-direction: row;
    height: 100%;
    font-size: 12px;
    line-height: 1.4em;
    background-image: radial-gradient(var(--circuit-dot-color) 10%, var(--circuit-background-color) 10%);
    background-position: 0 0;
    background-size: 14px 14px;
    user-select: none;
`;
