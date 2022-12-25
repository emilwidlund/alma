import { css } from '@emotion/css';

export const projectCardWrapperStyles = (index: number) => css`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    transform: translate(0, 20px);
    opacity: 0;
    animation: fade-up 1s calc(${index} * 0.12s) forwards;

    @keyframes fade-up {
        from {
            transform: translate(0, 20px);
            opacity: 0;
        }

        to {
            transform: translate(0, 0);
            opacity: 1;
        }
    }
`;

export const projectCardMediaStyles = (url?: string) => css`
    position: relative;
    width: 320px;
    height: 240px;
    background-color: #000;
    background-image: url(${url});
    background-position: center center;
    background-size: cover;
    border-radius: 32px;
    overflow: hidden;
`;

export const projectCardCanvasStyles = css`
    width: 320px;
    height: 240px;
    border-radius: 32px;

    &.fade-enter {
        opacity: 0;
    }

    &.fade-enter-active {
        opacity: 1;
        transition: opacity 500ms;
    }

    &.fade-exit {
        opacity: 1;
    }

    &.fade-exit-active {
        opacity: 0;
        transition: opacity 500ms;
    }
`;

export const projectCardContentStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 32px;
    color: var(--text-light-color);
`;

export const projectCardInfoStyles = css`
    color: var(--text-neutral-color);
`;

export const projectCardInfoSeparatorStyles = css`
    margin: 0 8px;
`;
