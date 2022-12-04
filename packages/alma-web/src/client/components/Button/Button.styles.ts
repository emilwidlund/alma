import { css } from '@emotion/css';

import { ButtonVariant } from './Button.types';

export const buttonStyles = (variant?: ButtonVariant) => css`
    position: relative;
    display: flex;
    background-color: transparent;
    font-family: inherit;
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-feature-settings: 'ss01' 1, 'cv01' 1;
    padding: 16px 24px;
    line-height: inherit;
    background-color: ${variant === ButtonVariant.SECONDARY ? 'rgba(255, 255, 255, .1)' : 'var(--accent-color)'};
    border: none;
    border-radius: 8px;
    color: var(--text-light-color);
    transition: opacity 0.15s;

    &:hover:not(:disabled) {
        opacity: 0.6;
    }

    &:active:not(:disabled) {
        opacity: 0.5;
    }

    &:disabled {
        opacity: 0.2;
    }
`;
