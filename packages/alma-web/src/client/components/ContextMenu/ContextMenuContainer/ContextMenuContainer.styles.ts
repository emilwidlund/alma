import { css } from '@emotion/css';

import { IPoint } from '../../../hooks/useCartesianMidpoint/useCartesianMidpoint.types';

export const contextMenuContainerStyles = (position: IPoint) => css`
    display: flex;
    flex-direction: column;
    padding: 6px;
    border-radius: 12px;
    background-color: var(--panel-background);
    position: absolute;
    top: ${position.y}px;
    left: ${position.x}px;
    width: 220px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-feature-settings: 'ss02' 1;
    max-height: 500px;
`;

export const contextMenuSectionStyles = css`
    display: flex;
    flex-direction: column;
    margin-top: 18px;

    &:first-child {
        margin-top: 8px;
    }
`;

export const contextMenuSectionTitleStyles = css`
    padding: 0 0 8px 12px;
    font-size: var(--font-size-xs);
`;
