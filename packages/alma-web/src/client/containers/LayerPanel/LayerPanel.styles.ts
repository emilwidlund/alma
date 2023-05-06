import { css } from '@emotion/css';

export const layerPanelWrapperStyles = css`
    display: flex;
    flex-direction: column;
    width: 320px;
    border-left: 1px solid var(--border-color);
`;

export const layerPanelItemListStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;
    flex-grow: 1;
    border-top: 1px solid var(--border-color);
    height: 50%;
    padding: 24px 16px;
`;
