import { css } from '@emotion/css';

export const dashboardWrapperStyles = css`
    margin: 82px 0;
`;

export const dashboardHeaderWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 82px;
    color: var(--text-light-color);
`;

export const dashboardHeaderContentStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const dashboardHeaderIdentityStyles = css`
    margin-left: 32px;
`;

export const dashboardHeaderMetaStyles = css`
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

export const dashboardHeaderFollwersStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;

    .icon {
        margin-right: 6px;
    }
`;
