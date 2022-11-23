import { css } from '@emotion/css';

export const toolbarItemContainerStyles = (cta?: boolean) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    height: 20px;
    width: ${cta ? '60px' : '40px'};
    border-radius: 36px;
    background-color: ${cta ? 'var(--accent-color)' : 'transparent'};
    color: ${cta ? 'var(--text-light-color)' : 'inherit'};
    margin: 0 ${cta ? '12px' : '4px'};
    padding: 12px 16px;
    box-shadow: ${cta ? '0px 0px 5px var(--accent-color-subtle)' : 'none'};
    transition: background-color 0.15s, box-shadow 0.15s;

    &:hover {
        color: var(--text-light-color);
        background-color: ${cta ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)'};
        box-shadow: ${cta ? '0px 0px 10px var(--accent-color)' : 'none'};
    }

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }
`;
