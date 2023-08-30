import { isLit, Lit, Vec, vec2, vec3, vec4 } from '@thi.ng/shader-ast';
import { InputValue } from '@usealma/graph';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { VectorControlProps } from './VectorControl.types';
import { Input } from '../../Input/Input';
import { BaseControl } from '../BaseControl/BaseControl';

const vectorLabels = ['x', 'y', 'z', 'w'];

export const VectorControl = observer(({ port }: VectorControlProps) => {
    const createOnChangeHandler = React.useCallback(
        (component: string) => {
            return (e: React.ChangeEvent<HTMLInputElement>) => {
                const portValue = port.node.resolveValue<Vec, InputValue<Vec>>(port.value);

                if (isLit(portValue)) {
                    let newVal: Lit<Vec> | undefined;

                    const vectorValues = portValue.val.map((literal: Lit<Vec>) => literal.val);
                    const indexToUpdate = vectorLabels.indexOf(component);

                    vectorValues[indexToUpdate] = e.target.valueAsNumber;

                    switch (portValue.type) {
                        case 'vec2':
                            newVal = vec2.apply(this, vectorValues);
                            break;
                        case 'vec3':
                            newVal = vec3.apply(this, vectorValues);
                            break;
                        case 'vec4':
                            newVal = vec4.apply(this, vectorValues);
                            break;
                    }

                    if (newVal) {
                        port.setValue(newVal);
                    }
                }
            };
        },
        [port]
    );

    const disabled = React.useMemo(() => port.connected, [port.connected]);

    const resolvedValue = port.node.resolveValue(port.value);
    const components = isLit(resolvedValue) ? resolvedValue.val.map((lit: Lit<Vec>) => lit.val) : [];

    return (
        <BaseControl title={port.name}>
            <div className="flex flex-row flex-nowrap items-center gap-x-2 w-full">
                {components.map((component: number, index: number) => (
                    <Input
                        key={index}
                        className="w-16 min-w-0 flex-shrink"
                        placeholder={vectorLabels[index]}
                        onChange={createOnChangeHandler(vectorLabels[index])}
                        value={component}
                        type="number"
                        step={0.1}
                        disabled={disabled}
                    />
                ))}
            </div>
        </BaseControl>
    );
});
