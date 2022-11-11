import { css } from '@emotion/css';

export const commandPaletteHorizontalPadding = 24;

export const commandPaletteWrapperStyles = css`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 600px;
    background-color: var(--panel-background);
    border-radius: 24px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    z-index: 999;
`;

export const commandPaletteInputStyles = css`
    display: flex;
    flex-direction: column;
    padding: 18px ${commandPaletteHorizontalPadding}px;
    border-bottom: 1px solid var(--border-color);
    input {
        background-color: transparent;
        border: none;
        font-size: 22px;
        &:focus {
            outline: none;
        }
    }
`;

export const commandPaletteFooterStyles = css`
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    height: 200px;
    max-height: 200px;
    overflow-y: auto;
`;
