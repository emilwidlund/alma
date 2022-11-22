import * as React from 'react';

export interface IToolbarItemProps {
    icon: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    cta?: boolean;
    outlined?: boolean;
}
