import { Output } from 'alma-graph';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Input } from '../../Input/Input';
import { BaseControl } from '../BaseControl/BaseControl';
import { numberControlInputStyles, numberControlNameStyles, numberControlRangeStyles } from './NumberControl.styles';
import { INumberControlProps } from './NumberControl.types';

export const NumberControl = observer(({ port }: INumberControlProps) => {
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            // port.setValue(e.target.valueAsNumber);
        },
        [port]
    );

    const isOutput = React.useMemo(() => port instanceof Output, [port]);
    const disabled = React.useMemo(() => isOutput || port.connected, [isOutput, port.connected]);

    return (
        <BaseControl>
            <span className={numberControlNameStyles}>{port.name}</span>
            <Input
                className={numberControlRangeStyles}
                placeholder="Number"
                onChange={onChange}
                // value={port.node.resolveValue(port.value)}
                type="range"
                disabled={disabled}
            />
            <Input
                className={numberControlInputStyles}
                placeholder="Number"
                onChange={onChange}
                // value={port.node.resolveValue(port.value)}
                type="number"
                disabled={disabled}
            />
        </BaseControl>
    );
});
