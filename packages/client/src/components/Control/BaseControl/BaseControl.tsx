import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { BaseControlProps } from './BaseControl.types';

export const BaseControl = observer(({ children }: BaseControlProps) => {
    return <div className="flex flex-row items-center my-1">{children}</div>;
});
