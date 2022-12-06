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
    padding: 14px 24px;
    line-height: inherit;
    background-color: ${variant === ButtonVariant.SECONDARY ? 'transparent' : 'var(--accent-color)'};
    border: none;
    border-radius: 8px;
    color: var(--text-light-color);
    transition: opacity 0.15s;
    box-shadow: ${variant === ButtonVariant.SECONDARY ? 'none' : '0 5px 10px rgba(0, 0, 0, .1)'};

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
