import { noop } from 'lodash';
import * as React from 'react';

import { ButtonVariant } from '../../components/Button/Button.types';
import { TextArea } from '../../components/TextArea/TextArea';
import { GLSL_EDITOR_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';
import { ICodeModalContentProps, ICodeModalOpenOptions } from './useCodeModal.types';

export const CodeModalContent = ({ content: defaultContent, onSave, onCancel }: ICodeModalContentProps) => {
    const [content, setContent] = React.useState(defaultContent || '');
    const modal = React.useContext(ModalContext);

    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const content = e.target.value;
            setContent(content);

            modal.update({
                actions: [
                    {
                        label: 'Save',
                        disabled: content.length < 1,
                        onPress: () => {
                            modal.close(GLSL_EDITOR_MODAL_ID);
                            onSave?.(content);
                        }
                    },
                    {
                        label: 'Cancel',
                        variant: ButtonVariant.SECONDARY,
                        onPress: () => {
                            modal.close(GLSL_EDITOR_MODAL_ID);
                            onCancel?.(content);
                        }
                    }
                ]
            });
        },
        [modal]
    );

    return (
        <>
            <TextArea placeholder="Define a GLSL Function" value={content} onChange={onChange} />
        </>
    );
};

export const useCodeModal = () => {
    const modal = React.useContext(ModalContext);

    const open = React.useCallback(
        ({ content, onSave, onCancel }: ICodeModalOpenOptions) => {
            modal.queue({
                id: GLSL_EDITOR_MODAL_ID,
                title: 'Edit GLSL',
                children: <CodeModalContent content={content} onSave={onSave} onCancel={onCancel} />,
                actions: [
                    { label: 'Save', disabled: true, onPress: noop },
                    {
                        label: 'Cancel',
                        variant: ButtonVariant.SECONDARY,
                        onPress: () => {
                            modal.close(GLSL_EDITOR_MODAL_ID);
                            onCancel?.('');
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
