import { css } from '@emotion/css';

export const layerPropertyWrapperStyles = css`
    display: flex;
    flex-direction: column;
    display: flex;
    flex-direction: column;
    background-color: var(--dark-background);
    border-radius: 16px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin-top: 24px;

    &:first-child {
        margin-top: 0;
    }
`;

export const layerPropertyHeaderStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const layerPropertyHeaderTitleStyles = css`
    margin-left: 8px;
`;

export const layerPropertyDescriptionStyles = css`
    margin-top: 32px;
    font-size: var(--font-size-xs);
    margin: 16px 0;
`;

export const layerPropertyMetaStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const layerPropertyTypeStyles = css`
    font-size: var(--font-size-xs);
    padding: 6px 12px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    color: var(--text-light-color);
`;

export const layerPropertyUniformNameStyles = css`
    margin-left: 12px;
    font-size: var(--font-size-xs);
`;
