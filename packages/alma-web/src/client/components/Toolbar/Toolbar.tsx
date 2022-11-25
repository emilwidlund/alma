import * as React from 'react';

import { toolbarContainerStyles } from './Toolbar.styles';
import { IToolbarProps } from './Toolbar.types';

export const Toolbar = ({ children }: IToolbarProps) => {
    return <div className={toolbarContainerStyles}>{children}</div>;
};
