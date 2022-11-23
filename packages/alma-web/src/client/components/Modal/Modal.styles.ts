import { css } from '@emotion/css';

export const modalWrapperStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(15px);
    z-index: 9999;
    overflow: hidden;
`;

export const modalContainerStyles = css`
    display: flex;
    flex-direction: column;
    max-width: 480px;
    border-radius: 24px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
    background-color: var(--panel-background);
`;

export const modalHeaderStyles = css`
    padding: 12px;
`;

export const modalContentStyles = css`
    padding: 12px;
`;

export const modalFooterStyles = css`
    padding: 16px 12px;
    border-top: 1px solid var(--border-color);
`;
