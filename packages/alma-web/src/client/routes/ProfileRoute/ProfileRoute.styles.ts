import { css } from '@emotion/css';

export const profileWrapperStyles = css`
    margin: 82px 0;
`;

export const profileHeaderWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 82px;
    color: var(--text-light-color);
`;

export const profileHeaderContentStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const profileHeaderIdentityStyles = css`
    margin-left: 32px;
`;

export const profileHeaderMetaStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: var(--text-neutral-color);

    > * {
        margin-left: 24px;
    }

    > :first-child {
        margin-left: 0;
    }
`;

export const profileHeaderFollwersStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;

    .icon {
        margin-right: 6px;
    }
`;
