export interface IIconProps {
    className?: string;
    name: string;
    size?: number;
    color?: string;
    outlined?: boolean;
    onMouseEnter?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
    onMouseLeave?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
    onMouseDown?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
    onMouseUp?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
    onClick?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}
