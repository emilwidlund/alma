import * as React from 'react';

import { Portal } from '../Portal/Portal';
import {
    modalContainerStyles,
    modalContentStyles,
    modalFooterStyles,
    modalHeaderStyles,
    modalWrapperStyles
} from './Modal.styles';
import { IModalProps } from './Modal.types';

export const Modal = ({ modal: { title, children, actions, id }, onClose }: IModalProps) => {
    const closeOnEscapeKey = React.useCallback(
        (e: KeyboardEvent) => (e.key === 'Escape' ? onClose?.(e) : null),
        [onClose]
    );

    React.useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKey);

        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [closeOnEscapeKey]);

    return (
        <Portal wrapperId={id}>
            <div className={modalWrapperStyles}>
                <div className={modalContainerStyles}>
                    <div className={modalHeaderStyles}>
                        <h4>{title}</h4>
                    </div>
                    <div className={modalContentStyles}>{children}</div>
                    <div className={modalFooterStyles}>{actions}</div>
                </div>
            </div>
        </Portal>
    );
};
