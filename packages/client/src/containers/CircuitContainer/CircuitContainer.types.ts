import { IPoint } from '../../hooks/useCartesianMidpoint/useCartesianMidpoint.types';

export interface IConnectionsProps {
    mousePosition: IPoint;
}

export interface ICircuitContainerProps {
    onContextMenu?(e: React.MouseEvent<HTMLDivElement>): void;
    onFullscreen?(e: React.MouseEvent<HTMLDivElement>): void;
}
