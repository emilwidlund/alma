import { css } from '@emotion/css';

export const buttonStyles = css`
    position: relative;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    align-self: flex-start;
    align-items: baseline;
    background-color: transparent;
    padding: 12px 24px;
    line-height: inherit;
    background-color: var(--accent-color);
    border: none;
    border-radius: 12px;
    color: var(--text-light-color);
    transition: opacity 0.15s;

    &:hover {
        opacity: 0.6;
    }

    &:active {
        opacity: 0.5;
    }
`;
