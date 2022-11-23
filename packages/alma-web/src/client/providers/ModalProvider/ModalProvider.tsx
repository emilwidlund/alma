import { noop } from 'lodash';
import * as React from 'react';

import { Modal } from '../../components/Modal/Modal';
import { IModal } from './ModalProvider.types';

const defaultModalContextValue: {
    stack: IModal[];
    queue(item: IModal): void;
    clear(): void;
} = {
    stack: [],
    queue: noop,
    clear: noop
};

export const ModalContext = React.createContext(defaultModalContextValue);

export const ModalProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [stack, setStack] = React.useState<IModal[]>([]);

    const item = React.useMemo(() => stack[0], [stack]);

    const queue = React.useCallback(
        (item: IModal) => {
            setStack(stack => [...stack, item]);
        },
        [setStack]
    );

    const clear = React.useCallback(() => {
        setStack(stack => stack.slice(1));
    }, []);

    const modalContextValue = React.useMemo(
        () => ({
            stack,
            queue,
            clear
        }),
        [stack, queue]
    );

    return (
        <ModalContext.Provider value={modalContextValue}>
            <>{children}</>
            {item && <Modal modal={item} onClose={clear} />}
        </ModalContext.Provider>
    );
};
