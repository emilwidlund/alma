import { Type } from '@thi.ng/shader-ast';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useSchematic } from '../../../hooks/useSchematic/useSchematic';
import { BaseControl } from '../BaseControl/BaseControl';
import { typeControlNameStyles } from './TypeControl.styles';
import { ITypeControlProps } from './TypeControl.types';

export const TypeControl = observer(({ node }: ITypeControlProps) => {
    const schematic = useSchematic();
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (node.data.type) {
                node.data.type.selected = e.target.value as Type;
            }

            schematic.context?.reset();
        },
        [node, schematic]
    );

    return (
        <BaseControl>
            <span className={typeControlNameStyles}>Type</span>
            <select onChange={onChange}>
                {node.data.type?.options.map(type => (
                    <option key={type} value={type} children={type} />
                ))}
            </select>
        </BaseControl>
    );
});
