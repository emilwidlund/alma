import { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    icon?: JSX.Element;
};
