import * as React from 'react';

export const useClickOutside = <
    T extends HTMLElement,
    R extends React.RefObject<T | undefined>,
    A extends (event: MouseEvent | TouchEvent) => any
>(
    ref: R,
    handler?: A
) => {
    const listener = React.useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (!ref.current || (event.target && ref.current.contains(event.target as Node))) {
                return;
            }

            handler?.(event);
        },
        [ref]
    );

    React.useEffect(() => {
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};
