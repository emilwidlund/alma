export interface ICommandItemProps {
    label: string;
    keysPressed: Set<string>;
    active: boolean;
    onSelect(): void;
    shortcut?: string[];
}
