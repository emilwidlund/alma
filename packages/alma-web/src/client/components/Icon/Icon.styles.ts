import { css } from '@emotion/css';

export const iconWrapperStyles = (size: number, color?: string, outlined?: boolean) => css`
    user-select: none;
    -webkit-user-select: none;
    color: ${color};
    font-size: ${size}px;
    font-variation-settings: 'FILL' ${outlined ? 0 : 1}, 'wght' 400, 'GRAD' 0, 'opsz' 20;
`;
