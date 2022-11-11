import { css } from '@emotion/css';

export const panelWrapperStyles = css`
    display: flex;
    flex-direction: column;
    background-color: var(--panel-background);
    width: 300px;
    border-radius: 32px;
    box-sizing: border-box;
    border: 1px solid var(--border-color);
    overflow: auto;
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
    padding: 24px;
`;
