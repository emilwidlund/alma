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

export const layerPanelItemWrapperStyles = (active: boolean) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    margin-top: 6px;
    transition: background-color 0.1s, color 0.1s;

    ${active
        ? `
     background-color: rgba(255, 255, 255, 0.05);
     color: #fff;
    `
        : undefined}

    &:hover {
        background-color: rgba(255, 255, 255, ${active ? '0.05' : '0.03'});
        color: #fff;
    }

    &:first-child {
        margin-top: 0;
    }
`;

export const layerPanelItemNameStyles = css`
    margin-left: 14px;
    font-size: var(--font-size-xs);
`;
