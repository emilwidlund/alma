import { css } from '@emotion/css';

export const gradientStyles = css`
    position: fixed;
    height: 100vh;
    width: 100%;
    --gradient-color-1: #c3e4ff;
    --gradient-color-2: #6ec3f4;
    --gradient-color-3: #eae2ff;
    --gradient-color-4: #b9beff;
    opacity: 0.9;
`;

export const landingRouteStyles = css`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

export const landingRouteHeroContentStyles = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 48px;
    z-index: 9;
`;

export const landingRouteHeroHeadlineStyles = css`
    font-weight: 400;
    font-size: 56px;
    margin-bottom: 0;
`;

export const landingRouteHeroParagraphStyles = css`
    font-size: 24px;
    margin-bottom: 48px;
    line-height: 1.4em;
    text-align: center;
`;

export const landingRouteButtonGroupStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * {
        margin-right: 24px;
    }

    & > :last-child {
        margin-right: 0;
    }
`;

export const landingRouteFooterStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 32px 0;
    font-size: 14px;
    z-index: 9;

    a {
        color: #fff;
        border-bottom: 1px solid #fff;
        padding-bottom: 6px;
    }
`;
