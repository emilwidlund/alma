import * as React from 'react';

import { textAreaStyles } from './TextArea.styles';
import { ITextAreaProps } from './TextArea.types';

export const TextArea = ({ value, placeholder, disabled, onChange }: ITextAreaProps) => {
    return (
        <textarea
            className={textAreaStyles}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
    );
};
