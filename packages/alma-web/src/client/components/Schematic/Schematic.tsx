import { cx } from '@emotion/css';
import * as React from 'react';

import { schematicWrapperStyles, schematicContentStyles } from './Schematic.styles';
import { ISchematicProps } from './Schematic.types';

export const Schematic = React.forwardRef<HTMLDivElement, ISchematicProps>(
    ({ children, className, onMouseMove, onClick, onMouseDown, onMouseUp }: ISchematicProps, ref) => {
        return (
            <div
                className={cx(schematicWrapperStyles, className)}
                onMouseMove={onMouseMove}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onClick={onClick}
            >
                <div ref={ref} className={schematicContentStyles} children={children} />
            </div>
        );
    }
);
