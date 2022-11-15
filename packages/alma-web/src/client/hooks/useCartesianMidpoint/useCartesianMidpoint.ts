import * as React from 'react';

import { getCartesianPoint } from '../../utils/coordinates/coordinates';

export const useCartesianMidpoint = (ref: React.MutableRefObject<HTMLElement | null>) => {
    const midpoint = React.useRef({ x: 0, y: 0 });

    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            const intersectionRect = entry.intersectionRect;
            const localMidPoint = getCartesianPoint(intersectionRect.width, intersectionRect.height, 0, 0);
            const mid = {
                x: localMidPoint.x - entry.boundingClientRect.left,
                y: localMidPoint.y - entry.boundingClientRect.top
            };

            midpoint.current = mid;
        }
    });

    React.useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current);

            return () => observer.disconnect();
        }
    });

    return midpoint;
};
