import { css } from '@emotion/css';

export const navBarWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: var(--accent-color);
    padding: 24px 0;
`;

export const navBarItemsStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const navBarLinkStyles = css`
    display: flex;
    flex-direction: row;
    margin-left: 42px;
    color: var(--text-light-color);
    font-size: var(--font-size-xxs);
    text-decoration: none;

    &:first-of-type {
        margin-left: 0;
    }
`;
