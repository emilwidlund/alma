import { float, Lit } from '@thi.ng/shader-ast';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useCircuit } from '../../../hooks/useCircuit/useCircuit';
import { Input } from '../../Input/Input';
import { BaseControl } from '../BaseControl/BaseControl';
import { INumberControlProps } from './NumberControl.types';

export const NumberControl = observer(({ port }: NumberControlProps) => {
    const circuit = useCircuit();
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            port.setValue(float(e.target.valueAsNumber));
        },
        [port, circuit]
    );

    const disabled = React.useMemo(() => port.connected, [port.connected]);

    const resolvedValue = port.node.resolveValue(port.value);
    const value = resolvedValue.type === 'float' && (resolvedValue as Lit<'float'>).val;

    return (
        <BaseControl>
            <span className={numberControlNameStyles}>{port.name}</span>
            <Input
                className="w-16"
                placeholder="Number"
                onChange={onChange}
                value={value}
                type="number"
                step={0.1}
                disabled={disabled}
            />
        </BaseControl>
    );
});
