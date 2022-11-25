import { noop } from 'lodash';
import * as React from 'react';

import { Modal } from '../../components/Modal/Modal';
import { IModal } from './ModalProvider.types';

const defaultModalContextValue: {
    stack: IModal[];
    queue(item: IModal): void;
    close(id: string): void;
    update(item: Partial<IModal>): void;
    current?: IModal;
} = {
    stack: [],
    queue: noop,
    close: noop,
    update: noop,
    current: undefined
};

export const ModalContext = React.createContext(defaultModalContextValue);

export const ModalProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [stack, setStack] = React.useState<IModal[]>([]);

    const current = React.useMemo(() => stack[0], [stack]);

    const queue = React.useCallback(
        (item: IModal) => {
            setStack(stack => [...stack, item]);
        },
        [setStack]
    );

    const update = React.useCallback(
        (update: Partial<IModal>) => {
            if (current) {
                setStack(stack => {
                    const rest = stack.slice(1);
                    return [{ ...current, ...update }, ...rest];
                });
            }
        },
        [stack, setStack]
    );

    const close = React.useCallback(
        (id: string) => {
            setStack(stack => {
                if (current?.id === id) {
                    return stack.slice(1);
                } else {
                    return stack;
                }
            });
        },
        [current]
    );

    const modalContextValue = React.useMemo(
        () => ({
            stack,
            queue,
            update,
            close,
            current
        }),
        [stack, queue, close, current, update]
    );

    return (
        <ModalContext.Provider value={modalContextValue}>
            <>{children}</>
            {current && (
                <Modal
                    modal={current}
                    onClose={() => {
                        setStack(stack => stack.slice(1));
                    }}
                />
            )}
        </ModalContext.Provider>
    );
};
