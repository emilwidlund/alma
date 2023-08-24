'use client';

import { loader } from '@monaco-editor/react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { CodeEditorProps } from './CodeEditor.types';
import { language } from './languages/glsl/glsl';
import { alma } from './themes/alma';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loader.init().then(monaco => {
            monaco.languages.register({ id: 'glsl' });
            monaco.languages.setMonarchTokensProvider('glsl', language);
            monaco.editor.defineTheme('alma', alma);
        });
    }, []);

    return (
        <motion.div
            className="flex flex-col h-full items-stretch px-4 py-8"
            initial={{ opacity: 0 }}
            animate={loaded && { opacity: 1 }}
        >
            <MonacoEditor
                language="glsl"
                theme="alma"
                value={value}
                onChange={onChange}
                onMount={() => setLoaded(true)}
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
        </motion.div>
    );
};
