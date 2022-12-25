import { monaco } from 'react-monaco-editor';

import { language } from './languages/glsl/glsl';
import { nightOwl } from './themes/nightOwl';

monaco.languages.register({ id: 'glsl' });
monaco.languages.setMonarchTokensProvider('glsl', language);
monaco.editor.defineTheme('nightOwl', nightOwl as any);
