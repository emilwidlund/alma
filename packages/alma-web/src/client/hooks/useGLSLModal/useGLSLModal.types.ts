export type IGLSLModalContentProps = IGLSLModalOpenOptions;

export interface IGLSLModalOpenOptions {
    glsl?: string;
    onSave?(glsl: string): void;
    onCancel?(glsl: string): void;
}
