import { css } from '@emotion/css';

export const toolbarItemContainerStyles = (cta?: boolean) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: ${cta ? '80px' : '40px'};
    border-radius: 36px;
    background-color: ${cta ? 'var(--accent-color)' : 'transparent'};
    color: ${cta ? 'var(--text-light-color)' : 'inherit'};
    transition: background-color 0.15s;
    margin: 0 12px;
    box-shadow: ${cta ? '0px 5px 20px var(--accent-color-subtle)' : 'none'};

    &:hover {
        color: var(--text-light-color);
        background-color: rgba(255, 255, 255, 0.1);
        box-shadow: none;
    }

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }
`;
