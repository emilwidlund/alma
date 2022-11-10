import * as React from 'react';

import { artboardWrapperStyles } from './Artboard.styles';
import { IArtboardProps } from './Artboard.types';

export const Artboard = ({ context }: IArtboardProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        ref.current?.appendChild(context.canvas);
    }, [context]);

    return <div ref={ref} className={artboardWrapperStyles} />;
};
