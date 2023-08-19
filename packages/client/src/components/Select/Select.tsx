import clsx from "clsx";

import { SelectProps } from "./Select.types"

export const Select = ({ icon: Icon, ...props }: SelectProps) => {
    const classNames = clsx('flex items-center px-3 py-2 bg-neutral-200 rounded-lg text-sm text-accent');
    const inputClassNames = clsx('w-full text-xs bg-transparent outline-none text-text-dark', {
        'ml-2': !!Icon
    });


    return (
        <div className={classNames}>
            {Icon ? <Icon fontSize="inherit" /> : null}
            <select className={inputClassNames} {...props} />
        </div>
    )
}