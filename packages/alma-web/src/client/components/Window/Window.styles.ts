import { css } from '@emotion/css';

export const windowWrapperStyles = css`
    display: flex;
    flex-direction: column;
    background-color: var(--window-background);
    width: auto;
    height: auto;
`;

export const windowResizableStyles = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    box-sizing: border-box;
`;

export const windowHeaderStyles = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
`;

export const windowContentStyles = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 24px 16px;
`;

export const windowHandleStyles = (direction: string, dimension: string) => css`
    --window-handle-color: var(--border-color);

    ${direction}: 0px !important;
    ${dimension}: 1px !important;
    background-color: var(--window-handle-color);
`;
