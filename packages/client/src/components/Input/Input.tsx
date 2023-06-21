import clsx from 'clsx';
import { cloneElement } from 'react';

import { InputProps } from './Input.types';

export const Input = ({ icon, className, ...props }: InputProps) => {
    const classNames = clsx('flex items-center px-3 py-2 bg-neutral-200 rounded-lg text-sm text-accent', className);
    const inputClassNames = clsx('w-full text-xs bg-transparent outline-none text-text-dark', {
        'ml-2': !!icon
    });

    return (
        <div className={classNames}>
            {icon ? cloneElement(icon, { fontSize: 'inherit' }) : null}
            <input className={inputClassNames} {...props} />
        </div>
    );
};
