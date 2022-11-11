import * as React from 'react';
import Draggable from 'react-draggable';

import { artboardWrapperStyles } from './Artboard.styles';
import { IArtboardProps } from './Artboard.types';

export const Artboard = React.forwardRef<HTMLCanvasElement, IArtboardProps>(({ size }, ref) => {
    return (
        <Draggable bounds="parent">
            <div className={artboardWrapperStyles}>
                <canvas ref={ref} width={size.width} height={size.height} />
            </div>
        </Draggable>
    );
});
