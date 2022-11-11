import * as React from 'react';

import { commandPaletteItemWrapperStyles } from './CommandPaletteItem.styles';
import { ICommandItemProps } from './CommandPaletteItem.types';

export const CommandPaletteItem = ({ label, active }: ICommandItemProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current && active) {
            ref.current.scrollIntoView({ block: 'center' });
        }
    }, [active]);

    return (
        <div ref={ref} className={commandPaletteItemWrapperStyles(active)}>
            <span>{label}</span>
        </div>
    );
};
