import * as React from 'react';

import { Size } from '../../types';
import { spinnerWrapperStyles } from './Spinner.styles';
import { ISpinnerProps } from './Spinner.types';

export const Spinner = ({ size = Size.SM, color = '#fff' }: ISpinnerProps) => {
    const spinnerSize = React.useMemo(() => {
        switch (size) {
            case Size.MD:
                return {
                    c: 16,
                    r: 13,
                    viewBox: 32,
                    size: 31,
                    offset: 78,
                    strokeWidth: 3
                };

            case Size.SM:
            default:
                return {
                    c: 11,
                    r: 8,
                    viewBox: 22,
                    size: 21,
                    offset: 48,
                    strokeWidth: 2
                };
        }
    }, [size]);

    return (
        <svg
            className={spinnerWrapperStyles(spinnerSize.offset)}
            width={`${spinnerSize?.size}px`}
            height={`${spinnerSize?.size}px`}
            viewBox={`0 0 ${spinnerSize?.viewBox} ${spinnerSize?.viewBox}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                className="path"
                fill="none"
                strokeWidth={spinnerSize.strokeWidth}
                strokeLinecap="round"
                stroke={color}
                cx={spinnerSize?.c}
                cy={spinnerSize?.c}
                r={spinnerSize?.r}
            ></circle>
        </svg>
    );
};
