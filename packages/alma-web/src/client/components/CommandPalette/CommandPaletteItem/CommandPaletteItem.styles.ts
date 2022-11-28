import { css } from '@emotion/css';

import { commandPaletteHorizontalPadding } from '../CommandPalette.styles';

export const commandPaletteItemWrapperStyles = (active: boolean) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px ${commandPaletteHorizontalPadding}px;
    background-color: ${active ? `var(--accent-color)` : 'transparent'};
    color: var(--text-light-color);

    transition: color 0.15s, background-color 0.15s;

    &:hover {
        background-color: var(--accent-color);
    }
`;
