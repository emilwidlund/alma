import { css } from '@emotion/css';

export const modalWrapperStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    z-index: 9999;
    overflow: hidden;
    animation: fade-in 0.1s;

    @keyframes fade-in {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
`;

export const modalContainerStyles = css`
    display: flex;
    flex-direction: column;
    width: 480px;
    border-radius: 24px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
    background-color: var(--panel-background);
`;

export const modalHeaderStyles = css`
    padding: 24px;
    color: var(--text-light-color);
`;

export const modalContentStyles = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
`;

export const modalFooterStyles = css`
    padding: 16px 24px;
    border-top: 1px solid var(--border-color);
`;
