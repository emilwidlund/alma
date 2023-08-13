import * as React from 'react';

import { CIRCUIT_SIZE } from '../../constants/circuit';
import { fromCartesianPoint, toCartesianPoint } from '../../utils/coordinates/coordinates';
import { IPoint } from './useCartesianMidpoint.types';

export const useCartesianMidpoint = (ref: React.MutableRefObject<HTMLElement | null>) => {
    const midpoint = React.useRef<IPoint>({ x: 0, y: 0 });

    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            const intersectionRect = entry.intersectionRect;
            const localMidPoint = fromCartesianPoint(intersectionRect.width, intersectionRect.height, 0, 0);
            const mid = {
                x: localMidPoint.x - entry.boundingClientRect.left,
                y: localMidPoint.y - entry.boundingClientRect.top
            };

            midpoint.current = toCartesianPoint(CIRCUIT_SIZE, CIRCUIT_SIZE, mid.x, mid.y);
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
