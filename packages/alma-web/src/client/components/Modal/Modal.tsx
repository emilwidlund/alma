import * as React from 'react';

import { Size } from '../../types';
import { Button } from '../Button/Button';
import { Heading } from '../Heading/Heading';
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
        document.body.classList.add('modal-open');

        document.body.addEventListener('keydown', closeOnEscapeKey);

        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
            document.body.classList.remove('modal-open');
        };
    }, [closeOnEscapeKey]);

    return (
        <Portal wrapperId={id}>
            <div className={modalWrapperStyles}>
                <div className={modalContainerStyles}>
                    <div className={modalHeaderStyles}>
                        <Heading size={Size.XS} marginBottom={0}>
                            {title}
                        </Heading>
                    </div>
                    <div className={modalContentStyles}>{children}</div>
                    <div className={modalFooterStyles}>
                        {actions.map(action => (
                            <Button key={action.label} {...action} />
                        ))}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
