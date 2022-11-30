import * as React from 'react';

import { artboardWrapperStyles } from './Artboard.styles';
import { IArtboardProps } from './Artboard.types';

export const Artboard = React.forwardRef<HTMLCanvasElement, IArtboardProps>(({ size: { width, height } }, ref) => {
    return (
        <div className={artboardWrapperStyles}>
            <canvas ref={ref} width={width} height={height} />
        </div>
    );
});
