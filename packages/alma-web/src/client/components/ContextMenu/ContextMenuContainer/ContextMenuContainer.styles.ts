import { css } from '@emotion/css';

import { HIERARCHY } from '../../../constants/hierarchy';
import { IPoint } from '../../../hooks/useCartesianMidpoint/useCartesianMidpoint.types';

export const contextMenuContainerStyles = (position?: IPoint) => css`
    display: flex;
    flex-direction: column;
    padding: 8px;
    border-radius: 12px;
    background-color: var(--panel-background);
    position: absolute;
    width: 200px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-feature-settings: 'ss02' 1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    z-index: ${HIERARCHY.contextMenu};

    ${position
        ? `top: ${position.y}px;
    left: ${position.x}px;`
        : undefined}
`;

export const contextMenuSectionStyles = css`
    display: flex;
    flex-direction: column;
    margin-top: 18px;

    &:first-child {
        margin-top: 0px;
    }
`;

export const contextMenuSectionTitleStyles = css`
    margin-top: 4px;
    padding: 0 0 8px 12px;
    font-size: var(--font-size-xxs);
`;
