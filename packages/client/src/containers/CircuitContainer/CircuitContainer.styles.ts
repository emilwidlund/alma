import { css } from '@emotion/css';

import { HIERARCHY } from '../../constants/hierarchy';
import { IBounds } from '../../utils/bounds/bounds.types';

export const circuitSelectionStyles = ({ x, y, width, height }: IBounds) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: ${width}px;
    height: ${height}px;
    transform: translate(${x}px, ${y}px);
    border: 1px solid var(--accent-color);
    background-color: rgba(0, 0, 0, 0.2);
    z-index: ${HIERARCHY.selection};
`;

export const circuitContainerStyles = css`
    position: relative;
`;
