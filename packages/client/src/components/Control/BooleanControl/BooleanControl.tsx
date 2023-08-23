import { bool, Lit } from '@thi.ng/shader-ast';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Switch } from '../../Switch/Switch';
import { useCircuit } from '../../../hooks/useCircuit/useCircuit';
import { BaseControl } from '../BaseControl/BaseControl';
import { BooleanControlProps } from './BooleanControl.types';

export const BooleanControl = observer(({ port }: BooleanControlProps) => {
    const circuit = useCircuit();
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            port.setValue(bool(e.target.value === 'true'));
        },
        [port, circuit]
    );

    const disabled = React.useMemo(() => port.connected, [port.connected]);

    const resolvedValue = port.node.resolveValue(port.value);
    const value = resolvedValue.type === 'bool' ? (resolvedValue as Lit<'bool'>).val : undefined;

    return typeof value !== 'undefined' ? (
        <BaseControl>
            <span className={booleanControlNameStyles}>Type</span>
            <Switch active={value} onChange={onChange} />
        </BaseControl>
    ) : null;
});
