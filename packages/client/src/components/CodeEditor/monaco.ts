'use client';

import { loader } from '@monaco-editor/react';

import { language } from './languages/glsl/glsl';
import { alma } from './themes/alma';

loader.init().then(monaco => {
    monaco.languages.register({ id: 'glsl' });
    monaco.languages.setMonarchTokensProvider('glsl', language);
    monaco.editor.defineTheme('alma', alma as any);
});
