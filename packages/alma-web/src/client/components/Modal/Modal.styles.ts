import { css } from '@emotion/css';

import { HIERARCHY } from '../../constants/hierarchy';

export const modalWrapperStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    z-index: ${HIERARCHY.modal};
    overflow: hidden;
    animation: fade-in 0.15s;

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
    width: 600px;
    border-radius: 24px;
    font-size: var(--font-size-xs);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
    background-color: var(--panel-background);
`;

export const modalContentStyles = css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 42px;
    max-height: 440px;
    overflow-y: auto;
`;

export const modalFooterStyles = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 32px 42px 42px 42px;
    border-top: 1px solid var(--border-color);

    * {
        margin-right: 16px;

        &:last-child {
            margin-right: 0;
        }
    }
`;
