import * as React from 'react';

import { ModalProps } from './Modal.types';
import { Button } from '../Button/Button';
import { Portal } from '../Portal/Portal';

export const Modal = ({ modal: { title, children, actions, id }, onClose }: ModalProps) => {
    const closeOnEscapeKey = React.useCallback(
        (e: KeyboardEvent) => (e.key === 'Escape' ? onClose?.(e) : null),
        [onClose]
    );

    React.useEffect(() => {
        document.body.classList.add('modal-open');
        document.body.addEventListener('keydown', closeOnEscapeKey);

        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
            document.body.classList.remove('modal-open');
        };
    }, [closeOnEscapeKey]);

    return (
        <Portal wrapperId={id}>
            <div className="flex flex-col justify-center items-center fixed inset-0 backdrop-blur-md z-50 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, .2)' }}>
                <div className="flex flex-col rounded-3xl text-sm shadow-xl bg-neutral-100" style={{ width: 600 }}>
                    <div className="relative flex flex-col p-11 max-h-96 overflow-y-auto">{children}</div>
                    <div className="flex flex-row justify-center items-center pt-8 pr-11 pb-11 pl-11 border-t border-neutral-500 [&>*]:mr-4 [&>*:last-child]:mr-0">
                        {actions.map((action, index) => (
                            <Button key={index} {...action} />
                        ))}
                    </div>
                </div>
            </div>
        </Portal>
    );
};