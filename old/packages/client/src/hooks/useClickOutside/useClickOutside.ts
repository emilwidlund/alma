/** eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';

export const useClickOutside = <
    T extends HTMLElement,
    R extends React.RefObject<T | undefined>,
    A extends React.MouseEventHandler<T>
>(
    ref: R,
    handler?: A
) => {
    const listener = React.useCallback(
        (event: any) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler?.(event);
        },
        [ref, handler]
    );

    React.useEffect(() => {
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, listener]);
};
