import * as React from 'react';

import { textAreaStyles } from './TextArea.styles';
import { ITextAreaProps } from './TextArea.types';

export const TextArea = ({ value, placeholder, disabled, readOnly, onChange }: ITextAreaProps) => {
    const ref = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        ref.current?.focus();
    }, []);

    return (
        <textarea
            ref={ref}
            className={textAreaStyles}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
        />
    );
};
