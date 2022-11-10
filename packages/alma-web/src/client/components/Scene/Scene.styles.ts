import { css } from '@emotion/css';

export const sceneWrapperStyles = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: var(--panel-background-color);

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
