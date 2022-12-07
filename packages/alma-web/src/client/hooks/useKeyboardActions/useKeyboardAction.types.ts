import { KeyboardKey } from '../../global';

export type KeyboardAction = {
    key: KeyboardKey | string;
    modifier?: 'ctrlKey' | 'altKey' | 'metaKey';
    callback: (e: KeyboardEvent) => void;
};
