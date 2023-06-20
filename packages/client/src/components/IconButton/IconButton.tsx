import { cloneElement } from 'react';
import { Button } from '../Button/Button';
import { IconButtonProps } from './IconButton.types';

export const IconButton = ({ icon, ...buttonProps }: IconButtonProps) => {
    return (
        <Button className="text-md" {...buttonProps} compact>
            {cloneElement(icon, { fontSize: 'inherit' })}
        </Button>
    );
};
