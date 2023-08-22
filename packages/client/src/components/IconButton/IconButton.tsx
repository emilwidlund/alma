import { cloneElement } from 'react';

import { IconButtonProps } from './IconButton.types';
import { Button } from '../Button/Button';

export const IconButton = ({ icon, children, ...buttonProps }: IconButtonProps) => {
    return (
        <Button className="flex flex-row items-center text-md text-sm" {...buttonProps}>
            {cloneElement(icon, { fontSize: 'inherit' })}
            {children ? <span className='ml-2'>{children}</span> : null}
        </Button>
    );
};
