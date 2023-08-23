import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { BaseControlProps } from './BaseControl.types';

export const BaseControl = observer(({ title, children }: BaseControlProps) => {
    return (
        <div className="flex flex-row items-center justify-between my-1">
            <span className="grow-1 text-sm w-42 mr-6">{title}</span>
            <>{children}</>
        </div>
    );
});