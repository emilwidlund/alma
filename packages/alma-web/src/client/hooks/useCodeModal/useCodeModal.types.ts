export type ICodeModalContentProps = ICodeModalOpenOptions;

export interface ICodeModalOpenOptions {
    content?: string;
    onSave?(glsl: string): void;
    onCancel?(glsl: string): void;
}
