import * as React from 'react';

import { buttonGlyphStyles, buttonWrapperStyles } from './Button.styles';
import { IButtonProps } from './Button.types';

export const Button = ({ label, onPress, size, glyph, glyphPosition }: IButtonProps) => {
    return (
        <button
            className={buttonWrapperStyles(size)}
            children={
                <>
                    <span>{label}</span>
                    {glyph && <span className={buttonGlyphStyles(glyphPosition)}>{glyph}</span>}
                </>
            }
            onClick={onPress}
        />
    );
};
