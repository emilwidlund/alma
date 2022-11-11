import { css } from '@emotion/css';

export const artboardWrapperStyles = css`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    z-index: 19;
`;

export const fullscreenIconStyles = css`
    position: absolute;
    bottom: 16px;
    left: 16px;
`;
