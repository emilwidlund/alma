import { css } from '@emotion/css';

export const navBarWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
`;

export const navBarAsideStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
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
    font-size: var(--font-size-sm);
    text-decoration: none;

    &:first-of-type {
        margin-left: 0;
    }
`;

export const navBarUserInfoStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 32px;
`;

export const navBarUserUsernameStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--text-light-color);
    margin-right: 16px;
`;
