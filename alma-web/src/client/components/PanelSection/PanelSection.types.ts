import * as React from 'react';

export type PanelSectionProps = React.PropsWithChildren<{
    title: string;
    action?: {
        icon: string;
        onClick: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    };
}>;
