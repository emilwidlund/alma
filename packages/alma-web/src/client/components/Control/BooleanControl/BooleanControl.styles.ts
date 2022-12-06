import { css } from '@emotion/css';

export const booleanControlNameStyles = css`
    flex-grow: 1;
    font-size: 12px;
    width: 120px;
    margin-right: 24px;
`;

export const booleanControlInputStyles = css`
    width: 120px;
    background-color: var(--panel-background);
    color: var(--text-light-color);
    font-size: var(--font-size-xxs);
    font-family: 'Inter var';
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: 0.1em;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 0px;

    &:focus {
        outline: none;
    }
`;
