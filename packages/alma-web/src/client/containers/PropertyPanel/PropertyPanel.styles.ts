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
    padding: 16px 0 16px 0;
    text-align: center;
`;

export const propertyPanelInfoHeadingStyles = css`
    font-weight: 500;
    margin: 24px 0 8px;
`;

export const propertyPanelInfoParagraphStyles = css`
    margin-bottom: 0;
    color: var(--text-neutral-color);
    font-size: 12px;
    line-height: 1.6em;
    padding: 0 12px;
`;

export const propertyPanelPortsContainerStyles = css`
    margin-top: 24px;
`;
