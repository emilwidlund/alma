import { css } from '@emotion/css';

export const projectRouteWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100vh;
    overflow: hidden;
`;

export const projectArtboardWrapperStyles = css`
    width: 70%;
    height: 100%;
`;

export const projectArtboardCanvasStyles = css`
    width: 100%;
    height: 100%;
`;

export const projectInfoPanelStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 100%;
    background-color: var(--dark-contrast-background);
    text-align: center;
    padding: 48px;
    box-sizing: border-box;
`;

export const projectInfoUsernameStyles = css`
    margin: 24px 0 64px;
    font-size: var(--font-size-sm);
`;

export const projectInfoSeparatorStyles = css`
    margin: 0 8px;
`;

export const projectActionButtonsStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const projectCloneButtonStyles = css`
    margin-left: 16px;
`;
