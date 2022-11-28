import * as React from 'react';

export interface IContextMenuItemProps {
    label: string;
    icon: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
