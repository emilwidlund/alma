import { ReactNode } from 'react';

import { Size } from '../../types';

export interface IHeadingProps {
    className?: string;
    children: ReactNode;
    size: Extract<Size, Size.LG | Size.MD | Size.SM | Size.XS>;
    color?: string;
    marginTop?: number;
    marginBottom?: number;
}
