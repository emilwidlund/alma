export interface GLSLModalOpenOptions {
    content?: string;
    onSave?(glsl: string | undefined): void;
    onCancel?(glsl: string | undefined): void;
}

export type GLSLModalContentProps = GLSLModalOpenOptions;
