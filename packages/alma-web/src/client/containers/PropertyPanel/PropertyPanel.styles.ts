import { css } from '@emotion/css';

import { HIERARCHY } from '../../constants/hierarchy';

export const propertyPanelWrapperStyles = css`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    margin: 48px 48px 48px;
    color: var(--text-light-color);
    z-index: ${HIERARCHY.propertyPanel};
`;

export const propertyPanelInfoStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
    padding: 6px 0 12px 0;
    text-align: center;
`;

export const propertyPanelInfoHeadingStyles = css`
    margin: 24px 0 8px;
`;

export const propertyPanelInfoParagraphStyles = css`
    margin-bottom: 0;
    color: var(--text-neutral-color);
`;

export const propertyPanelPortsContainerStyles = css`
    margin-top: 24px;
`;
