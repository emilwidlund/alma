import { OnChange } from '@monaco-editor/react';

export type CodeEditorProps = {
    value: string | undefined;
    onChange?: OnChange;
};
