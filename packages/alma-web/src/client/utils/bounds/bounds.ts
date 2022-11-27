import { ICircuitSelectionBounds } from '../../providers/CircuitProvider/CircuitProvider.types';

/** Normalizes bounds from negative to absolute values */
export const normalizeBounds = ({ x, y, width, height }: ICircuitSelectionBounds) => {
    return {
        x: width < 0 ? x + width : x,
        y: height < 0 ? y + height : y,
        width: Math.abs(width),
        height: Math.abs(height)
    };
};
