import { css } from '@emotion/css';

export const layerPanelItemWrapperStyles = (active: boolean) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    border-radius: 12px;
    margin-top: 8px;
    background-color: var(--dark-background);
    border: 2px solid transparent;
    transition: color 0.1s, border-color 0.1s;

    ${active
        ? `
 border-color: var(--accent-color);
 color: #fff;
`
        : undefined}

    &:hover {
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
