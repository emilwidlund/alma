import * as React from 'react';

import { spinnerWrapperStyles } from './Spinner.styles';

export const Spinner = () => {
    return (
        <svg
            className={spinnerWrapperStyles}
            width="21px"
            height="21px"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                className="path"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                stroke="#fff"
                cx="11"
                cy="11"
                r="8"
            ></circle>
        </svg>
    );
};
