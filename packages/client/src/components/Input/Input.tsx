import { clsx } from 'clsx';

import { InputProps } from './Input.types';

export const Input = ({ icon: Icon, className, ...props }: InputProps) => {
    const classNames = clsx(
        'flex items-center px-3 py-2 bg-neutral-200 rounded-lg text-sm text-accent border border-black border-opacity-5',
        className
    );
    const inputClassNames = clsx('w-full text-xs bg-transparent outline-none text-text-dark', {
        'ml-2': !!Icon
    });

    return (
        <div className={classNames}>
            {Icon ? <Icon fontSize="inherit" /> : null}
            <input className={inputClassNames} {...props} />
        </div>
    );
};
