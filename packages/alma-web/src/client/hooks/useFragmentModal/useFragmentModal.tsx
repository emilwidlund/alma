import * as glslPrettier from 'prettier-plugin-glsl';
import { format } from 'prettier/standalone';
import * as React from 'react';

import { TextArea } from '../../components/TextArea/TextArea';
import { CODE_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';

export const useFragmentModal = () => {
    const modal = React.useContext(ModalContext);

    const open = React.useCallback(
        (fragment: string) => {
            const formattedCode = format(fragment, { plugins: [glslPrettier], parser: 'glsl-parser' });

            modal.queue({
                id: CODE_MODAL_ID,
                title: '',
                children: <TextArea value={formattedCode} readOnly />,
                actions: [
                    {
                        label: 'Close',
                        onPress: () => {
                            modal.close(CODE_MODAL_ID);
                        }
                    }
                ]
            });
        },
        [modal]
    );

    return {
        open,
        close: modal.close
    };
};
