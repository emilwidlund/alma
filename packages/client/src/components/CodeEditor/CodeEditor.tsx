'use client';

import { loader } from '@monaco-editor/react';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { CodeEditorProps } from './CodeEditor.types';
import { language } from './languages/glsl/glsl';
import { alma } from './themes/alma';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
    useEffect(() => {
        loader.init().then(monaco => {
            monaco.languages.register({ id: 'glsl' });
            monaco.languages.setMonarchTokensProvider('glsl', language);
            monaco.editor.defineTheme('alma', alma as any);
        });
    }, []);

    return (
        <div className="flex flex-col h-full items-stretch px-4 py-8">
            <MonacoEditor
                language="glsl"
                theme="alma"
                value={value}
                onChange={onChange}
                options={{
                    selectOnLineNumbers: true,
                    overviewRulerBorder: false,
                    formatOnPaste: true,
                    formatOnType: true,
                    minimap: { enabled: false },
                    scrollbar: {
                        verticalScrollbarSize: 5,
                        horizontalScrollbarSize: 5,
                        useShadows: false
                    },
                    hideCursorInOverviewRuler: true,
                    contextmenu: false
                }}
            />
        </div>
    );
};
