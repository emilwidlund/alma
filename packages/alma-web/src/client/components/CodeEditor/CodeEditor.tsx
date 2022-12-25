import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

import { codeEditorWrapperStyles } from './CodeEditor.styles';
import { ICodeEditorProps } from './CodeEditor.types';

export const CodeEditor = ({ code, onChange }: ICodeEditorProps) => {
    return (
        <MonacoEditor
            className={codeEditorWrapperStyles}
            language="glsl"
            theme="nightOwl"
            value={code}
            options={{
                padding: { top: 24 },
                selectOnLineNumbers: true,
                formatOnPaste: true,
                formatOnType: true,
                minimap: { enabled: false }
            }}
            onChange={onChange}
        />
    );
};
