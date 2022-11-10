import * as React from 'react';

import { artboardWrapperStyles } from './Artboard.styles';
import { IArtboardProps } from './Artboard.types';

export const Artboard = ({ context }: IArtboardProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {}, [context]);

    return <div ref={ref} className={artboardWrapperStyles} />;
};
