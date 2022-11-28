import { css } from '@emotion/css';

export const contextMenuItemNameWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const contextMenuItemWrapperStyles = css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    transition: background-color 0.1s, color 0.1s;
    border-radius: 8px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }

    &:hover > .name-wrapper {
        color: var(--text-light-color);
    }
`;

export const contextMenuItemLabelStyles = css`
    margin-left: 10px;
    font-size: var(--font-size-xs);
`;
