import * as React from 'react';

import { KeyboardKey } from '../../global';

export const useKeyPress = (targetKey: KeyboardKey) => {
    const [keyPressed, setKeyPressed] = React.useState(false);

    const downHandler = ({ key }: KeyboardEvent) => {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    return keyPressed;
};
