import { css } from '@emotion/css';

export const spinnerWrapperStyles = (offset: number) => css`
    --offset: ${offset};
    --duration: 1.4s;

    animation: rotator var(--duration) linear infinite;

    @keyframes rotator {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(270deg);
        }
    }

    .path {
        stroke-dasharray: var(--offset);
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: dash var(--duration) ease-in-out infinite;
    }

    @keyframes dash {
        0% {
            stroke-dashoffset: var(--offset);
        }
        50% {
            stroke-dashoffset: var(--offset) / 4;
            transform: rotate(135deg);
        }
        100% {
            stroke-dashoffset: var(--offset);
            transform: rotate(450deg);
        }
    }
`;
