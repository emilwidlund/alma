import * as React from 'react';

import { KeyboardKey } from '../../types';

export const useKeyPress = (targetKey: KeyboardKey) => {
    const [keyPressed, setKeyPressed] = React.useState(false);

    const downHandler = React.useCallback(({ key }: KeyboardEvent) => {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }, [setKeyPressed, targetKey])

    const upHandler = React.useCallback(({ key }: KeyboardEvent) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    }, [setKeyPressed, targetKey]);

    React.useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [downHandler, upHandler]);

    return keyPressed;
};
