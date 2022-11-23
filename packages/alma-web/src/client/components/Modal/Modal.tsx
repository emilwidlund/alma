import * as React from 'react';

import { Portal } from '../Portal/Portal';
import { modalContainerStyles, modalWrapperStyles } from './Modal.styles';
import { IModalProps } from './Modal.types';

export const Modal = ({ title, children, footer, onClose }: IModalProps) => {
    React.useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose?.(e) : null);

        document.body.addEventListener('keydown', closeOnEscapeKey);

        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [onClose]);

    return (
        <Portal wrapperId="modal-portal-wrapper">
            <div className={modalWrapperStyles}>
                <div className={modalContainerStyles}>
                    <h4>{title}</h4>
                    <div>{children}</div>
                    <div>{footer}</div>
                </div>
            </div>
        </Portal>
    );
};
