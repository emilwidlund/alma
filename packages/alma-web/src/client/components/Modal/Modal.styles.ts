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
    width: 540px;
    border-radius: 24px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
    background-color: var(--panel-background);
`;

export const modalContentStyles = css`
    display: flex;
    flex-direction: column;
    padding: 32px;
`;

export const modalFooterStyles = css`
    display: flex;
    flex-direction: row-reverse;
    justify-items: flex-end;
    padding: 32px;
    border-top: 1px solid var(--border-color);

    * {
        margin-left: 16px;
    }
`;
