export interface IIconProps {
    name: string;
    size?: number;
    color?: string;
    className?: string;
    onMouseEnter?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
    onMouseLeave?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
    onMouseDown?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
    onMouseUp?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
    onClick?(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}
