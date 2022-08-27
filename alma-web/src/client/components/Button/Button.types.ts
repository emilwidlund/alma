import { MouseEventHandler } from 'react';
import { Size } from '../../types';

export interface IButtonProps {
    label: string;
    onPress: MouseEventHandler<HTMLButtonElement>;
    size: Extract<Size, Size.LG | Size.MD | Size.SM>;
    glyph?: string;
    glyphPosition?: 'left' | 'right';
}
