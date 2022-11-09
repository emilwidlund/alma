import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { BaseOutput } from '../../../../core/api/Port/Port';
import { Input } from '../../Input/Input';
import { BaseControl } from '../BaseControl/BaseControl';
import { numberControlInputStyles, numberControlNameStyles, numberControlRangeStyles } from './NumberControl.styles';
import { INumberControlProps } from './NumberControl.types';

export const NumberControl = observer(({ port }: INumberControlProps) => {
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            port.setValue(e.target.valueAsNumber);
        },
        [port]
    );

    const isOutput = React.useMemo(() => port instanceof BaseOutput, [port]);
    const disabled = React.useMemo(() => isOutput || port.connected, [isOutput, port.connected]);

    return (
        <BaseControl>
            <span className={numberControlNameStyles}>{port.name}</span>
            <Input
                className={numberControlRangeStyles}
                placeholder="Number"
                onChange={onChange}
                value={port.value}
                type="range"
                disabled={disabled}
                min={port.min}
                max={port.max}
                step={port.step}
            />
            <Input
                className={numberControlInputStyles}
                placeholder="Number"
                onChange={onChange}
                min={port.min}
                max={port.max}
                value={port.value}
                type="number"
                disabled={disabled}
            />
        </BaseControl>
    );
});
