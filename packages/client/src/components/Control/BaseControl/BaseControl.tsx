import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { BaseControlProps } from './BaseControl.types';

export const BaseControl = observer(({ title, children }: BaseControlProps) => {
    return (
        <div className="flex flex-row items-center justify-between my-2">
            <span className="text-sm mr-6 grow font-medium">{title}</span>
            <div className="relative flex flex-row justify-end items-center">{children}</div>
        </div>
    );
});
