import { css } from '@emotion/css';

export const layerPanelWrapperStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;
    width: 260px;
    border-left: 1px solid var(--border-color);
    padding: 12px 8px;
`;

export const layerPanelItemWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 24px;
    border-radius: 12px;
    transition: background-color 0.15s, color 0.15s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
        color: #fff;
    }
`;

export const layerPanelItemNameStyles = css`
    margin-left: 16px;
    font-size: var(--font-size-sm);
`;
