import { css } from '@emotion/css';

export const sceneWrapperStyles = css`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    &.fade-enter {
        opacity: 0;
    }

    &.fade-enter-active {
        opacity: 1;
        transition: opacity 0.25s;
    }

    &.fade-exit {
        opacity: 1;
    }

    &.fade-exit-active {
        opacity: 0;
        transition: opacity 0.25s;
    }
`;
