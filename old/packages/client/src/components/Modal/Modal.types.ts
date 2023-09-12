import * as React from 'react';

import { Modal } from '~/providers/ModalProvider/ModalProvider.types';

export type ModalProps = React.PropsWithChildren<{
    modal: Modal;
    onClose?(e: KeyboardEvent | React.MouseEvent): void;
}>;
