export type IGLSLModalContentProps = IGLSLModalOpenOptions;

export interface IGLSLModalOpenOptions {
    onSave?(glsl: string): void;
    onCancel?(glsl: string): void;
}
