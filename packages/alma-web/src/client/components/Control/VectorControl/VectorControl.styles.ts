import { css } from '@emotion/css';

export const vectorControlNameStyles = css`
    flex-grow: 1;
    font-size: 12px;
    width: 120px;
    margin-right: 24px;
`;

export const vectorControlInputStyles = css`
    max-width: 40px;
    min-width: 20px;
    flex-shrink: 1;
    background-color: var(--panel-background);
    border: 1px solid var(--border-color);
    margin-right: 6px;

    &:last-child {
        margin-right: 0;
    }
`;
