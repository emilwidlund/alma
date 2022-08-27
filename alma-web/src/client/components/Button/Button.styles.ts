import { css } from '@emotion/css';
import { IButtonProps } from './Button.types';

export const buttonWrapperStyles = (size: IButtonProps['size']) => css`
    --button-border-color: #fff;
    --button-border-offset: -6px;

    position: relative;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    align-self: flex-start;
    align-items: baseline;
    background-color: transparent;
    padding: calc(14px + var(--button-border-offset)) calc(34px + var(--button-border-offset));
    line-height: inherit;
    font-size: var(--font-size-xs);
    background-color: transparent;
    border: none;
    margin: 4px;
    color: inherit;
    transition: color 0.15s, background-color 0.15s, opacity 0.15s;

    &:after {
        content: '';
        position: absolute;
        top: var(--button-border-offset);
        right: var(--button-border-offset);
        bottom: var(--button-border-offset);
        left: var(--button-border-offset);
        border: 1px solid var(--button-border-color);
    }

    &:hover {
        color: var(--accent-color);
        background-color: #fff;
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.6);
    }
`;

export const buttonGlyphStyles = (position: 'left' | 'right' = 'right') => css`
    ${position === 'left' ? `margin-right: 20px;` : `margin-left: 20px;`}
`;
