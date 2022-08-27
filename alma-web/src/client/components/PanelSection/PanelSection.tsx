import * as React from 'react';

import { PanelSectionProps } from './PanelSection.types';

export const PanelSection = ({ title, action, children }: PanelSectionProps) => {
    return (
        <div>
            <div>
                <h3>{title}</h3>
            </div>
            <div>{children}</div>
        </div>
    );
};
