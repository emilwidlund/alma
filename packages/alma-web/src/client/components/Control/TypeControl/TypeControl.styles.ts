import { css } from '@emotion/css';

export const typeControlNameStyles = css`
    flex-grow: 1;
    font-size: var(--font-size-sm);
    font-weight: 600;
    width: 120px;
    margin-right: 24px;
`;

export const typeControlInputStyles = css`
    width: 120px;
    background-color: var(--panel-background);
    color: var(--text-light-color);
    font-size: var(--font-size-xs);
    font-family: 'Inter var';
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: 0.1em;
    padding: 6px;

    &:focus {
        outline: none;
    }
`;
