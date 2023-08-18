import { noop } from 'lodash';
import * as React from 'react';

import type { Modal as ModalType } from './ModalProvider.types';
import { Modal } from '../../components/Modal/Modal';

const defaultModalContextValue: {
    stack: ModalType[];
    queue(item: ModalType): void;
    close(id: string): void;
    update(item: Partial<ModalType>): void;
    current?: ModalType;
} = {
    stack: [],
    queue: noop,
    close: noop,
    update: noop,
    current: undefined
};

export const ModalContext = React.createContext(defaultModalContextValue);

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
    const [stack, setStack] = React.useState<ModalType[]>([]);

    const current = React.useMemo(() => stack[0], [stack]);

    const queue = React.useCallback(
        (item: ModalType) => {
            setStack(stack => [...stack, item]);
        },
        [setStack]
    );

    const update = React.useCallback(
        (update: Partial<ModalType>) => {
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
                const [current] = stack;

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
