import { cx } from '@emotion/css';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Draggable1, { DraggableProps } from 'react-draggable';
export const Draggable = Draggable1 as React.ComponentClass<Partial<DraggableProps>>;

import {
    nodeHeaderWrapperStyles,
    nodeContentWrapperStyles,
    nodeWrapperStyles,
    nodePortsWrapperStyles,
    nodeHeaderActionsStyles,
    nodeActionStyles,
    nodeHeaderNameWrapperStyle
} from './Node.styles';
import { INodeActionProps, INodePortsProps, INodeProps } from './Node.types';
import { Port } from './Port/Port';
import { CIRCUIT_SIZE, NODE_POSITION_OFFSET_X } from '../../constants/circuit';
import { fromCartesianPoint } from '../../utils/coordinates/coordinates';
import { Icon } from '../Icon/Icon';

import { useHover } from '~/hooks/useHover/useHover';

export const Node = observer(
    // eslint-disable-next-line react/display-name
    React.forwardRef<HTMLDivElement, INodeProps>(
        ({ name, active, inputs, outputs, position, actions, icon, onDrag, onClick, onFocus }, ref) => {
            const { onMouseEnter, onMouseLeave, isHovered } = useHover();

            return (
                <Draggable
                    position={fromCartesianPoint(
                        CIRCUIT_SIZE,
                        CIRCUIT_SIZE,
                        position.x - NODE_POSITION_OFFSET_X,
                        position.y
                    )}
                    onDrag={onDrag}
                    handle=".handle"
                >
                    <div
                        ref={ref}
                        className={nodeWrapperStyles(active)}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        tabIndex={0}
                    >
                        <div className={cx(nodeHeaderWrapperStyles(active), 'handle')}>
                            <div className={nodeHeaderNameWrapperStyle}>
                                <Icon name={icon} size={16} outlined />
                                <span>{name}</span>
                            </div>
                            {!!actions?.length && (
                                <div className={nodeHeaderActionsStyles(isHovered || active)}>
                                    {actions.map((action, index) => (
                                        <NodeAction key={`${index}-action`} {...action} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={nodeContentWrapperStyles}>
                            <NodePorts ports={Object.values(inputs)} />
                            <NodePorts ports={Object.values(outputs)} isOutputWrapper={true} />
                        </div>
                    </div>
                </Draggable>
            );
        }
    )
);

const NodeAction = ({ icon = 'circle', color = '#fff', onClick }: INodeActionProps) => {
    return <Icon className={nodeActionStyles} name={icon} size={14} color={color} onClick={onClick} />;
};

const NodePorts = ({ ports, isOutputWrapper }: INodePortsProps) => {
    return (
        <div className={nodePortsWrapperStyles(isOutputWrapper)}>
            {ports.map(port => (
                <Port key={port.id} port={port} />
            ))}
        </div>
    );
};
