import { bool, Lit } from '@thi.ng/shader-ast';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { BooleanControlProps } from './BooleanControl.types';
import { Switch } from '../../Switch/Switch';
import { BaseControl } from '../BaseControl/BaseControl';

export const BooleanControl = observer(({ port }: BooleanControlProps) => {
    const resolvedValue = port.node.resolveValue(port.value);
    const value = resolvedValue.type === 'bool' ? (resolvedValue as Lit<'bool'>).val : undefined;
    const disabled = React.useMemo(() => port.connected, [port.connected]);

    const onChange = React.useCallback(() => {
        port.setValue(bool(!value));
    }, [port, value]);

    return typeof value !== 'undefined' ? (
        <BaseControl title={port.name}>
            <Switch active={value} onChange={onChange} disabled={disabled} />
        </BaseControl>
    ) : null;
});
