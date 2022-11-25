import { css } from '@emotion/css';

export const toolbarContainerStyles = css`
    position: fixed;
    bottom: 32px;
    transform: translate(-50%, -50%);
    left: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 36px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    background-color: var(--panel-background);
    padding: 12px 16px;
    z-index: 999;
`;
