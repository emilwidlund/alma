import clsx from 'clsx';

import { SelectProps } from './Select.types';

export const Select = ({ icon: Icon, ...props }: SelectProps) => {
    const classNames = clsx(
        'relative flex flex-grow items-center bg-neutral-500 border border-neutral-300 rounded-lg text-sm text-accent'
    );
    const selectClassNames = clsx(
        'w-full text-xs bg-transparent outline-none font-medium capitalize mr-3 -ml-1 text-slate-300'
    );

    return (
        <div className={classNames}>
            {Icon ? <Icon className="mx-3 my-2.5" fontSize="inherit" /> : null}
            <select className={selectClassNames} {...props} />
        </div>
    );
};
