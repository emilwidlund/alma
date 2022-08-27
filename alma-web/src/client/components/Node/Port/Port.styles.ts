import { css } from '@emotion/css';

export const portWrapperStyles = (connected: boolean, reverseDirection: boolean, disabled: boolean) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    padding: 4px 0;
    font-size: var(--font-size-sm);
    cursor: pointer;
    user-select: none;
    transition: opacity 0.15s;

    ${reverseDirection ? 'padding-left' : 'padding-right'}: 16px;
    flex-direction: ${reverseDirection ? 'row-reverse' : 'row'};
    color: var(--text-dark-color);
    opacity: ${disabled ? 0.33 : 1};
`;

export const portTypeStyles = (connected: boolean, isOutput: boolean, isHovered: boolean) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 500;
    line-height: 1em;
    border-radius: 4px;
    background-color: ${connected
        ? isHovered
            ? 'var(--system-red)'
            : 'var(--accent-color)'
        : isHovered
        ? 'var(--accent-color)'
        : 'rgba(0, 0, 0, 0.1)'};
    color: ${connected || isHovered ? 'var(--text-light-color)' : 'var(--text-dark-color)'};
    width: 16px;
    height: 16px;
    transition: color 0.2s, background-color 0.2s, box-shadow 0.15s;

    ${isOutput ? 'margin-left: 8px;' : 'margin-right: 8px;'}
`;
