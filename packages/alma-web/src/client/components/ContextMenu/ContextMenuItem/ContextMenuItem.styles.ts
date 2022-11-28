import { css } from '@emotion/css';

export const contextMenuItemWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 12px;
    transition: background-color 0.1s, color 0.1s;
    border-radius: 8px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
        color: var(--text-light-color);
    }
`;

export const contextMenuItemLabelStyles = css`
    margin-left: 10px;
`;
