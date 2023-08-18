import { useCallback, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { PortalProps } from './Portal.types';

export const Portal = ({ children, wrapperId = 'portal-wrapper' }: PortalProps) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    const createWrapperAndAppendToBody = useCallback((wrapperId: string) => {
        const wrapperElement = document.createElement('div');
        wrapperElement.setAttribute('id', wrapperId);
        document.body.appendChild(wrapperElement);
        return wrapperElement;
    }, []);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element);

        return () => {
            if (systemCreated && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId, createWrapperAndAppendToBody]);

    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
};
