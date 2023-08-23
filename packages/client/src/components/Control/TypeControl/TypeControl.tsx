import { Type } from '@thi.ng/shader-ast';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useCircuit } from '../../../hooks/useCircuit/useCircuit';
import { BaseControl } from '../BaseControl/BaseControl';
import { typeControlInputStyles, typeControlNameStyles } from './TypeControl.styles';
import { ITypeControlProps } from './TypeControl.types';

export const TypeControl = observer(({ node }: ITypeControlProps) => {
    const circuit = useCircuit();
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (node.data.type) {
                node.data.type.selected = e.target.value as Type;
            }
        },
        [node, circuit]
    );

    return (
        <BaseControl>
            <span className={typeControlNameStyles}>Type</span>
            <select className={typeControlInputStyles} onChange={onChange} value={node?.data.type?.selected}>
                {node.data.type?.options.map(type => (
                    <option key={type} value={type} children={type.toUpperCase()} />
                ))}
            </select>
        </BaseControl>
    );
});
