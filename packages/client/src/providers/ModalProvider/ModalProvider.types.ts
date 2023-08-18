import { ButtonProps } from '../../components/Button/Button.types';

export interface Modal {
    id: string;
    title: string;
    children: JSX.Element;
    actions: ButtonProps[];
}
