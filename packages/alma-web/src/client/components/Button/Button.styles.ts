import { css } from '@emotion/css';

import { ButtonVariant } from './Button.types';

const getBackgroundColor = (variant?: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.SECONDARY:
            return 'rgba(0, 0, 0, .2)';
        case ButtonVariant.TERTIARY:
            return 'transparent';
        case ButtonVariant.PRIMARY:
        default:
            return 'var(--accent-color)';
    }
};

export const buttonStyles = (label: boolean, icon: boolean, variant?: ButtonVariant) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: transparent;
    font-family: inherit;
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-feature-settings: 'ss01' 1, 'cv01' 1;
    padding: ${icon && !label ? '12px' : '12px 20px'};
    line-height: inherit;
    background-color: ${getBackgroundColor(variant)};
    border: none;
    border-radius: 8px;
    color: var(--text-light-color);
    transition: opacity 0.15s;
    box-shadow: ${variant === ButtonVariant.PRIMARY ? '0 5px 10px rgba(0, 0, 0, .1)' : 'none'};

    &:hover:not(:disabled) {
        opacity: 0.6;
    }

    &:active:not(:disabled) {
        opacity: 0.5;
    }

    &:disabled {
        opacity: 0.2;
    }

    ${icon && label
        ? `.icon {
        margin-right: 12px;
    }`
        : undefined}
`;
