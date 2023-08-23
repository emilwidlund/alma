import { css } from '@emotion/css';

export const numberControlNameStyles = css`
    flex-grow: 1;
    font-size: 12px;
    width: 120px;
    margin-right: 24px;
`;

export const numberControlRangeStyles = css`
    margin-right: 24px;
    width: 40px;

    &[type='range'] {
        -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
        width: 100%; /* Specific width is required for Firefox. */
        background: transparent; /* Otherwise white in Chrome */
        border: none;
    }

    &[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
    }

    &[type='range']:focus {
        outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
    }

    &[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 12px;
        width: 12px;
        border-radius: 6px;
        background: var(--accent-color);
        cursor: pointer;
        border: none;
        margin-top: -5px;
    }

    /* All the same stuff for Firefox */
    &[type='range']::-moz-range-thumb {
        -webkit-appearance: none;
        height: 12px;
        width: 12px;
        border-radius: 6px;
        background: var(--accent-color);
        cursor: pointer;
        border: none;
    }

    &[type='range']::-webkit-slider-runnable-track {
        height: 2px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 3px;
    }
`;

export const numberControlInputStyles = css`
    width: 40px;
    background-color: var(--panel-background);
    border: 1px solid var(--border-color);
`;
