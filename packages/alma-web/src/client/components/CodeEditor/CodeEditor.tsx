import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

import { codeEditorWrapperStyles } from './CodeEditor.styles';
import { ICodeEditorProps } from './CodeEditor.types';

export const CodeEditor = ({ code, onChange }: ICodeEditorProps) => {
    const [width, setWidth] = React.useState<string | number>('50%');

    const handleWindowResize = React.useCallback(() => {
        setWidth(window.innerWidth / 2);
    }, []);

    React.useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    return (
        <MonacoEditor
            className={codeEditorWrapperStyles}
            language="glsl"
            theme="nightOwl"
            value={code}
            width={width}
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
