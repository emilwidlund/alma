import clsx from 'clsx';

import { SelectProps } from './Select.types';

export const Select = ({ icon: Icon, className, ...props }: SelectProps) => {
    const classNames = clsx(
        'relative flex flex-grow items-center bg-neutral-600 border border-neutral-500 rounded-lg text-sm text-accent h-10',
        className
    );
    const selectClassNames = clsx(
        'w-full text-xs bg-transparent outline-none font-medium capitalize mx-2 text-slate-300'
    );

    return (
        <div className={classNames}>
            {Icon ? <Icon className="ml-3 my-2.5" fontSize="inherit" /> : null}
            <select className={selectClassNames} {...props} />
        </div>
    );
};
