import * as React from 'react';

import { KeyboardKey } from '../../../types';

export const useMultiKeyPress = () => {
    const [keysPressed, setKeyPressed] = React.useState<Set<KeyboardKey>>(new Set([]));

    const downHandler = (e: KeyboardEvent) => {
        e.preventDefault();

        setKeyPressed(keys => {
            keys.add(e.key as KeyboardKey);
            return new Set(keys);
        });
    };

    const upHandler = ({ key }: KeyboardEvent) => {
        keysPressed.delete(key as KeyboardKey);
        setKeyPressed(new Set(keysPressed));
    };

    React.useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    return keysPressed;
};
