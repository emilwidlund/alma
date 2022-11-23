import { IButtonProps } from '../../components/Button/Button.types';

export interface IModal {
    id: string;
    title: string;
    children: JSX.Element;
    actions: IButtonProps[];
}
