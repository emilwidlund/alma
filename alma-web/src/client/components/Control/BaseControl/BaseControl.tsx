import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { IBaseControlProps } from './BaseControl.types';
import { baseControlWrapperStyles } from './BaseControl.styles';

export const BaseControl = observer(({ children }: IBaseControlProps) => {
    return <div className={baseControlWrapperStyles}>{children}</div>;
});
