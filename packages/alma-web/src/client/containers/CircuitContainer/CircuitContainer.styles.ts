import { css } from '@emotion/css';

import { ICircuitSelectionBounds } from '../../providers/CircuitProvider/CircuitProvider.types';

export const circuitSelectionStyles = ({ x, y, width, height }: ICircuitSelectionBounds) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: ${Math.abs(width)}px;
    height: ${Math.abs(height)}px;
    transform: translate(${width < 0 ? x + width : x}px, ${height < 0 ? y + height : y}px);
    border: 1px solid var(--accent-color);
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 19;
`;

export const circuitContainerStyles = css`
    position: relative;
`;
