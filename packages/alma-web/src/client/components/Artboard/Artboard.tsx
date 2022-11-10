import * as React from 'react';
import Draggable from 'react-draggable';

import { artboardWrapperStyles } from './Artboard.styles';
import { IArtboardProps } from './Artboard.types';

export const Artboard = React.forwardRef<HTMLCanvasElement>((_: IArtboardProps, ref) => {
    return (
        <Draggable bounds={{ top: 0, right: 0 }}>
            <div className={artboardWrapperStyles}>
                <canvas ref={ref} width={500} height={320} />
            </div>
        </Draggable>
    );
});
