import { ChangeHandler } from 'react-monaco-editor';

export interface ICodeEditorProps {
    onChange: ChangeHandler;
    code: string;
}
