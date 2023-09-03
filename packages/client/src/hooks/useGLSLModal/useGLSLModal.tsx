import { Processor } from '@usealma/webgl';
import { noop } from 'lodash';
import * as React from 'react';

import { GLSLModalContentProps, GLSLModalOpenOptions } from './useGLSLModal.types';
import { ButtonVariant } from '../../components/Button/Button.types';
import { GLSL_EDITOR_MODAL_ID } from '../../constants/modals';
import { ModalContext } from '../../providers/ModalProvider/ModalProvider';
import { CodeEditor } from '~/components/CodeEditor/CodeEditor';

const processor = new Processor();

export const GLSLModalContent = ({ content: defaultContent, onSave, onCancel }: GLSLModalContentProps) => {
    const [content, setContent] = React.useState(defaultContent);
    const modal = React.useContext(ModalContext);

    const onChange = React.useCallback(
        (value: string | undefined) => {
            try {
                processor.parse(value || '');

                setContent(value);

                modal.update({
                    actions: [
                        {
                            children: 'Save',
                            disabled: (value?.length || 0) < 1,
                            onClick: () => {
                                modal.close(GLSL_EDITOR_MODAL_ID);
                                onSave?.(value);
                            }
                        },
                        {
                            children: 'Cancel',
                            variant: ButtonVariant.TERTIARY,
                            onClick: () => {
                                modal.close(GLSL_EDITOR_MODAL_ID);
                                onCancel?.(value);
                            }
                        }
                    ]
                });
            } catch (err) {
                modal.update({
                    actions: [
                        {
                            children: 'Save',
                            disabled: true
                        },
                        {
                            children: 'Cancel',
                            variant: ButtonVariant.TERTIARY,
                            onClick: () => {
                                modal.close(GLSL_EDITOR_MODAL_ID);
                                onCancel?.(content);
                            }
                        }
                    ]
                });
            }
        },
        [content, modal, onCancel, onSave]
    );

    return (
        <div className="flex flex-col h-96">
            <p className="text-center mb-4 mx-auto w-96 leading-normal">
                Provide a GLSL function. Arguments and return type will be inferred automatically on the resulted node.
            </p>
            <CodeEditor value={content} onChange={onChange} />
        </div>
    );
};

export const useGLSLModal = () => {
    const modal = React.useContext(ModalContext);

    const open = React.useCallback(
        ({ content, onSave, onCancel }: GLSLModalOpenOptions) => {
            modal.queue({
                id: GLSL_EDITOR_MODAL_ID,
                title: 'Edit GLSL',
                children: <GLSLModalContent content={content} onSave={onSave} onCancel={onCancel} />,
                actions: [
                    { children: 'Save', disabled: true, onClick: noop },
                    {
                        children: 'Cancel',
                        variant: ButtonVariant.TERTIARY,
                        onClick: () => {
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
