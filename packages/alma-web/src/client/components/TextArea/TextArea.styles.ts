import { css } from '@emotion/css';

export const textAreaStyles = css`
    border: 2px solid var(--accent-color);
    overflow: auto;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    resize: none;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.2);
    color: var(--text-light-color);
    font-family: inherit;
    padding: 8px;
    min-height: 200px;
`;
