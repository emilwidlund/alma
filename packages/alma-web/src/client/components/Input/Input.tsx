import { cx } from '@emotion/css';
import * as React from 'react';

import { inputWrapperStyles } from './Input.styles';

export const Input = React.forwardRef<
    HTMLInputElement,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => {
    return <input {...props} ref={ref} className={cx(inputWrapperStyles, props.className)} />;
});
