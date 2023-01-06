import { bool, Lit } from '@thi.ng/shader-ast';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useCircuit } from '../../../hooks/useCircuit/useCircuit';
import { BaseControl } from '../BaseControl/BaseControl';
import { booleanControlInputStyles, booleanControlNameStyles } from './BooleanControl.styles';
import { IBooleanControlProps } from './BooleanControl.types';

export const BooleanControl = observer(({ port }: IBooleanControlProps) => {
    const circuit = useCircuit();
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            port.setValue(bool(e.target.value === 'true'));
        },
        [port, circuit]
    );

    const disabled = React.useMemo(() => port.connected, [port.connected]);

    const resolvedValue = port.node.resolveValue(port.value);
    const value = resolvedValue.type === 'bool' && (resolvedValue as Lit<'bool'>).val;

    return (
        <BaseControl>
            <span className={booleanControlNameStyles}>Type</span>
            <select className={booleanControlInputStyles} onChange={onChange} value={String(value)} disabled={disabled}>
                <option value={'true'}>True</option>
                <option value={'false'}>False</option>
            </select>
        </BaseControl>
    );
});
