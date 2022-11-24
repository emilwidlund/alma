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
    font-size: var(--font-size-xs);
    background-color: var(--accent-color);
    border: none;
    color: var(--text-light-color);
    transition: color 0.15s, background-color 0.15s;

`;
