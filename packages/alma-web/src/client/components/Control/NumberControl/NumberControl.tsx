import { float, Lit } from '@thi.ng/shader-ast';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useSchematic } from '../../../hooks/useSchematic/useSchematic';
import { Input } from '../../Input/Input';
import { BaseControl } from '../BaseControl/BaseControl';
import { numberControlInputStyles, numberControlNameStyles, numberControlRangeStyles } from './NumberControl.styles';
import { INumberControlProps } from './NumberControl.types';

export const NumberControl = observer(({ port }: INumberControlProps) => {
    const schematic = useSchematic();
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            port.setValue(float(e.target.valueAsNumber));
            schematic.context?.reset();
        },
        [port, schematic]
    );

    const disabled = React.useMemo(() => port.connected, [port.connected]);

    const resolvedValue = port.node.resolveValue(port.value);
    const value = resolvedValue.type === 'float' && (resolvedValue as Lit<'float'>).val;

    return (
        <BaseControl>
            <span className={numberControlNameStyles}>{port.name}</span>
            <Input
                className={numberControlRangeStyles}
                placeholder="Number"
                onChange={onChange}
                value={value}
                type="range"
                disabled={disabled}
            />
            <Input
                className={numberControlInputStyles}
                placeholder="Number"
                onChange={onChange}
                value={value}
                type="number"
                disabled={disabled}
            />
        </BaseControl>
    );
});
