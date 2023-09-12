import { TonalityOutlined } from '@mui/icons-material';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    icon?: typeof TonalityOutlined;
};
