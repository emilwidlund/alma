import { Point } from './Connection.types';

export const quadraticCurve = (start: Point, end: Point) => {
    const x1 = start.x;
    const y1 = start.y;
    const x4 = end.x;
    const y4 = end.y;
    const min_diff = 20;
    let offset: number;

    if (Math.abs(y4 - y1) < min_diff * 2) {
        offset = Math.abs(y4 - y1) / 2;
    } else {
        offset = min_diff;
    }

    let offsetX = offset;
    let offsetY = offset;

    if (y4 - y1 < 0) {
        offsetY = -offset;
    }

    if (x4 - x1 < -(min_diff * 2)) {
        offsetX = -offset;
    }

    const midX = (x4 - x1) / 2 + x1;

    return `
        M${x1},${y1} 
        L${midX - offsetX},${y1} 
        Q${midX},${y1} ${midX},${y1 + offsetY} 
        L${midX},${y4 - offsetY}
        Q${midX},${y4} ${midX + offsetX},${y4}
        L${x4},${y4}
    `;
};
