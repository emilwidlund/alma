import * as React from 'react';
import {motion} from 'framer-motion';

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
            <motion.div className="flex flex-col justify-center items-center fixed inset-0 z-50 overflow-hidden" initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} animate={{ backgroundColor: 'rgba(0, 0, 0, .2)' }}>
                <motion.div className="flex flex-col rounded-3xl text-sm shadow-xl bg-neutral-100" style={{ width: 600 }} initial={{ opacity: 0, transform: 'translateY(-50px)' }} animate={{ opacity: 1, transform: 'translateY(0)' }}>
                    <div className="relative flex flex-col p-14 max-h-96 overflow-y-auto">{children}</div>
                    <div className="flex flex-row justify-center items-center py-8 px-12 border-t border-neutral-500 [&>*]:mr-4 [&>*:last-child]:mr-0">
                        {actions.map((action, index) => (
                            <Button key={index} {...action} />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </Portal>
    );
};