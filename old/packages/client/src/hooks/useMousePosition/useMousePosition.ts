import * as React from 'react';

export const useMousePosition = <T extends HTMLElement | SVGElement>() => {
    const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const onMouseMove = React.useCallback((e: React.MouseEvent<T, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.nativeEvent.clientX - rect.left;
        const y = e.nativeEvent.clientY - rect.top;

        setMousePosition({ x, y });
    }, []);

    return {
        mousePosition,
        onMouseMove
    };
};
