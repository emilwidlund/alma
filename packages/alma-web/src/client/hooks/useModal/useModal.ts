import { useCallback, useContext } from 'react';

import { ModalContext } from '../../providers/ModalProvider/ModalProvider';
import { IModal } from '../../providers/ModalProvider/ModalProvider.types';

export const useModal = () => {
    const modalContext = useContext(ModalContext);

    const open = useCallback((modal: IModal) => {
        modalContext.queue(modal);
    }, []);

    const close = useCallback(() => {
        modalContext.clear();
    }, []);

    return {
        open,
        close
    };
};
