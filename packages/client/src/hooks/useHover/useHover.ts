import { useCallback, useRef, useState } from 'react';

export const useHover = <T extends HTMLElement>(): [(node: T | null) => void, boolean] => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = useCallback(() => setIsHovering(true), []);
    const handleMouseOut = useCallback(() => setIsHovering(false), []);

    const nodeRef = useRef<T | null>(null);

    const callbackRef = useCallback(
        (node: T | null) => {
            if (nodeRef.current) {
                nodeRef.current.removeEventListener('mouseover', handleMouseOver);
                nodeRef.current.removeEventListener('mouseout', handleMouseOut);
            }

            nodeRef.current = node;

            if (nodeRef.current) {
                nodeRef.current.addEventListener('mouseover', handleMouseOver);
                nodeRef.current.addEventListener('mouseout', handleMouseOut);
            }
        },
        [handleMouseOver, handleMouseOut]
    );

    return [callbackRef, isHovering];
};
