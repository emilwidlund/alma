import * as React from 'react';

export const useMultiKeyPress = () => {
    const [keysPressed, setKeyPressed] = React.useState<Set<string>>(new Set([]));

    const downHandler = ({ key }: KeyboardEvent) => {
        setKeyPressed(keysPressed.add(key));
    };

    const upHandler = ({ key }: KeyboardEvent) => {
        keysPressed.delete(key);
        setKeyPressed(keysPressed);
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
