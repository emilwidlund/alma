import * as React from 'react';

export interface ITextAreaProps {
    value: string;
    onChange?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}
