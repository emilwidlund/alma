import { cloneElement } from 'react';

import { IconButtonProps } from './IconButton.types';
import { Button } from '../Button/Button';

export const IconButton = ({ icon, ...buttonProps }: IconButtonProps) => {
    return (
        <Button className="text-md" {...buttonProps} compact>
            {cloneElement(icon, { fontSize: 'inherit' })}
        </Button>
    );
};
