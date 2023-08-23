import { Type } from '@thi.ng/shader-ast';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { TypeControlProps } from './TypeControl.types';
import { useCircuit } from '../../../hooks/useCircuit/useCircuit';
import { BaseControl } from '../BaseControl/BaseControl';

import { Select } from '~/components/Select/Select';


export const TypeControl = observer(({ node }: TypeControlProps) => {
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
        <BaseControl title="Type">
            <Select onChange={onChange} value={node?.data.type?.selected}>
            {node.data.type?.options.map(type => (
                    <option key={type} value={type}>
                        {type.toUpperCase()}
                    </option>
                ))}
            </Select>
        </BaseControl>
    );
});
