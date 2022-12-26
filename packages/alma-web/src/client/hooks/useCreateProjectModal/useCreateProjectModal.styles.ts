import { css } from '@emotion/css';

export const createProjectContentWrapperStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const createProjectSelectionWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 32px;

    & > * {
        margin-left: 24px;

        &:first-child {
            margin-left: 0;
        }
    }
`;

export const selectionBoxWrapperStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    height: 200px;
    width: 200px;
    box-sizing: border-box;
    border-radius: 24px;
    background-color: var(--dark-background);
    border: 2px solid transparent;
    cursor: pointer;
    transition: border-color 0.15s;

    &:hover {
        border-color: var(--accent-color);
    }
`;
