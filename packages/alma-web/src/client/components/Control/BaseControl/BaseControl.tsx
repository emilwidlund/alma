import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { baseControlWrapperStyles } from './BaseControl.styles';
import { IBaseControlProps } from './BaseControl.types';

export const BaseControl = observer(({ children }: IBaseControlProps) => {
    return <div className={baseControlWrapperStyles}>{children}</div>;
});
