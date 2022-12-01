import * as glslPrettier from 'prettier-plugin-glsl';
import { format } from 'prettier/standalone';
import * as React from 'react';

import { TextArea } from '../../components/TextArea/TextArea';
import { GLSL_EDITOR_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';

export const useCodeModal = () => {
    const modal = React.useContext(ModalContext);

    const open = React.useCallback(
        (code: string) => {
            const formattedCode = format(code, { plugins: [glslPrettier], parser: 'glsl-parser' });

            modal.queue({
                id: GLSL_EDITOR_MODAL_ID,
                title: 'Edit GLSL',
                children: <TextArea value={formattedCode} readOnly />,
                actions: [
                    {
                        label: 'Close',
                        onPress: () => {
                            modal.close(GLSL_EDITOR_MODAL_ID);
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
