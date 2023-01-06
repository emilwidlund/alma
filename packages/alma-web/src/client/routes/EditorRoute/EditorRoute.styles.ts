import { css } from '@emotion/css';

export const editorRouteWrapperStyles = css`
    display: flex;
    flex-direction: row;
    background-color: var(--background-color-dark);
`;

export const editorToolbarWrapperStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 32px;
    border-right: 1px solid var(--border-color);
`;

export const editorArtboardWrapperStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;
