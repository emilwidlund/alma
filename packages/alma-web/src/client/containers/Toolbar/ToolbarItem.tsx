import * as React from 'react';

import { Icon } from '../../components/Icon/Icon';
import { toolbarItemContainerStyles } from './ToolbarItem.styles';
import { IToolbarItemProps } from './ToolbarItem.types';

export const ToolbarItem = ({ icon, onClick, outlined, cta }: IToolbarItemProps) => {
    return (
        <div className={toolbarItemContainerStyles(cta)} onClick={onClick}>
            <Icon name={icon} outlined={outlined} />
        </div>
    );
};
