'use client';

import dynamic from 'next/dynamic';

import { CodeEditorProps } from './CodeEditor.types';
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });
import './monaco';

export const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
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
