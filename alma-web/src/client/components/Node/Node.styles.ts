import { css } from '@emotion/css';

export const NODE_CONTENT_PADDING = 12;

export const nodeWrapperStyles = (active: boolean) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 260px;
    user-select: none;
    z-index: ${active ? 9 : 0};
    border-radius: 12px;
    transition: box-shadow 0.15s;

    :focus {
        outline: none;
    }

    :active {
        box-shadow: ${active ? '0 0 20px rgba(0, 0, 0, 0.1)' : ''};
    }
`;

export const nodeHeaderWrapperStyles = (active: boolean) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    font-size: var(--font-size-sm);
    font-weight: 500;
    background-color: var(--light-background);
    color: ${active ? `var(--accent-color)` : `var(--text-dark-color)`};
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom: 2px solid ${active ? `var(--accent-color)` : `#eee`};
`;

export const nodeHeaderActionsStyles = (active: boolean) => css`
    opacity: ${active ? 1 : 0};
    transition: opacity 0.15s;
`;

export const nodeActionStyles = css`
    opacity: 1;
    transition: opacity 0.1s;

    &:hover {
        opacity: 0.4;
    }
`;

export const nodeContentWrapperStyles = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${NODE_CONTENT_PADDING}px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    background-color: var(--light-background);
`;

export const nodePortsWrapperStyles = (isOutputWrapper: boolean = false) => css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    ${isOutputWrapper ? 'align-items: flex-end;' : ''}
`;
