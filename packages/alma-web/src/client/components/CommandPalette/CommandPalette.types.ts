export type Command = {
    label: string;
    shortcut?: string[];
    onSelect(): void;
};

export type ICommandLineProps = React.PropsWithChildren<{
    items: Command[];
    onClose?(): void;
}>;
