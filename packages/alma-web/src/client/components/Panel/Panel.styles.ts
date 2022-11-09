import { css } from '@emotion/css';

export const panelWrapperStyles = css`
    --panel-background-color: var(--light-background);

    display: flex;
    flex-direction: column;
    background-color: var(---panel-background-color);
    width: auto;
    height: auto;
`;

export const panelResizableStyles = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    box-sizing: border-box;
`;

export const panelHeaderStyles = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
`;

export const panelContentStyles = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 24px 16px;
`;

export const panelHandleStyles = (direction: string, dimension: string) => css`
    --panel-handle-color: var(--border-color);

    ${direction}: 0px !important;
    ${dimension}: 1px !important;
    background-color: var(--panel-handle-color);
`;
