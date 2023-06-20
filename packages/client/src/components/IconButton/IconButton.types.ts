import { ButtonProps } from '../Button/Button.types';

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
    icon: JSX.Element;
};
