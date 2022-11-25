import * as React from 'react';

export interface IToolbarItemProps {
    label: string;
    icon: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    cta?: boolean;
    outlined?: boolean;
}
