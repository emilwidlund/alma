import * as React from 'react';

export interface ITextAreaProps {
    value: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}
