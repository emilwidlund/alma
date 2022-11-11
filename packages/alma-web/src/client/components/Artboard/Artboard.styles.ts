import { css } from '@emotion/css';

export const artboardWrapperStyles = css`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    z-index: 19;
    background-color: var(--panel-background);
    font-size: var(--font-size-xs);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1;
`;

export const artboardHeaderStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
`;
