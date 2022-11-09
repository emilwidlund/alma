import * as React from 'react';

import { schematicWrapperStyles } from './Schematic.styles';
import { ISchematicProps } from './Schematic.types';

export const Schematic = React.forwardRef<HTMLDivElement, ISchematicProps>(
    ({ children, onMouseMove, onClick, onMouseDown, onMouseUp }: ISchematicProps, ref) => {
        return (
            <div
                ref={ref}
                className={schematicWrapperStyles}
                children={children}
                onMouseMove={onMouseMove}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onClick={onClick}
            />
        );
    }
);
