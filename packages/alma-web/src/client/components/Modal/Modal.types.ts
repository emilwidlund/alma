import * as React from 'react';

import { IModal } from '../../providers/ModalProvider/ModalProvider.types';

export type IModalProps = React.PropsWithChildren<{
    modal: IModal;
    onClose?(e: KeyboardEvent | React.MouseEvent): void;
}>;
