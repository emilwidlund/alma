import { ReactNode } from 'react';

import { Size } from '../../types';

export interface IHeadingProps {
    className?: string;
    children: ReactNode;
    size: Extract<Size, Size.LG | Size.MD | Size.SM>;
    marginTop?: number;
    marginBottom?: number;
    signifier?: ReactNode;
}
