import * as React from 'react';

import { textAreaStyles } from './TextArea.styles';
import { ITextAreaProps } from './TextArea.types';

export const TextArea = ({ value, onChange }: ITextAreaProps) => {
    return <textarea className={textAreaStyles} value={value} onChange={onChange} />;
};
