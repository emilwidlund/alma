import clsx from "clsx";

import { SelectProps } from "./Select.types"

export const Select = ({ icon: Icon, ...props }: SelectProps) => {
    const classNames = clsx('relative flex flex-grow items-center px-3 py-2 bg-neutral-200 rounded-lg text-sm text-accent border border-black border-opacity-5');
    const selectClassNames = clsx('w-full text-xs bg-transparent outline-none text-text-dark font-medium capitalize pt-0.5', {
        'ml-2': !!Icon
    });


    return (
        <div className={classNames}>
            {Icon ? <Icon fontSize="inherit" /> : null}
            <select className={selectClassNames} {...props} />
        </div>
    )
}