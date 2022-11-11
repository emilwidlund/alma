import { css } from '@emotion/css';

export const panelWrapperStyles = css`
    display: flex;
    flex-direction: column;
    background-color: var(--panel-background);
    width: 300px;
    border-radius: 32px;
    box-sizing: border-box;
    overflow: auto;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
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
